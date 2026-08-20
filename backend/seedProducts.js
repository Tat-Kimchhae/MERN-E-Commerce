/**
 * seedProducts.js
 *
 * Bulk-adds every product from products.json to your backend by calling
 * the addProduct endpoint (multipart/form-data), one request per product.
 *
 * Install deps first:
 *   npm install axios form-data
 *
 * Usage:
 *   node seedProducts.js
 */

import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import axios from "axios";
import FormData from "form-data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- CONFIG: adjust these to match your project -----------------------

// Your backend endpoint
const API_URL = "http://localhost:4000/api/products";

// Folder where the actual .png files physically live on disk.
// This is the same folder that frontend/src/assets/assets.js imports from.
// Adjust the relative path below to match where you run this script from.
const IMAGE_DIR = path.join(__dirname, "../frontend/src/assets");

// Your addProduct route is behind verifyAdmin, which expects:
//   Authorization: Bearer <token>
// where the decoded token payload must contain an `email` field matching
// process.env.ADMIN_EMAIL. This must be a token from your ADMIN login
// endpoint, not a regular user login token (which only contains `id`).
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbWNoaGFlQGFkbWluLmNvbSIsImlhdCI6MTc4NzIzNjkyNCwiZXhwIjoxNzg3MzIzMzI0fQ.jK1o_stb2cDgApZsIpJcqfp7pTHDQKlqwB-6IYuwie4";

// The multer field name your route expects for the uploaded files.
// Your controller does `request.files.map(...)`, which means request.files
// is an ARRAY — so your route almost certainly uses something like:
//   upload.array("images", 4)
// Change this if your field name differs.
const FILE_FIELD_NAME = "images";

// -------------------------------------------------------------------------

async function seedOne(product) {
    const form = new FormData();

    form.append("name", product.name);
    form.append("description", product.description);
    form.append("price", String(product.price));
    form.append("category", product.category);
    form.append("subCategory", product.subCategory);
    form.append("sizes", JSON.stringify(product.sizes));
    form.append("bestSeller", String(product.bestseller ?? false));

    for (const filename of product.image) {
        const filePath = path.join(IMAGE_DIR, filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`  ! Missing file, skipping: ${filePath}`);
            continue;
        }
        form.append(FILE_FIELD_NAME, fs.createReadStream(filePath), filename);
    }

    const response = await axios.post(API_URL, form, {
        headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${ADMIN_TOKEN}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    });

    return response.data;
}

async function main() {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, "products.json"), "utf8"));

    console.log(`Seeding ${products.length} products to ${API_URL}...\n`);

    let ok = 0;
    let failed = 0;

    for (const product of products) {
        try {
            const result = await seedOne(product);
            if (result.status) {
                ok++;
                console.log(`✓ [${ok + failed}/${products.length}] ${product.name}`);
            } else {
                failed++;
                console.log(`✗ [${ok + failed}/${products.length}] ${product.name} -> ${result.msg}`);
            }
        } catch (err) {
            failed++;
            const msg = err.response?.data?.msg || err.message;
            console.log(`✗ [${ok + failed}/${products.length}] ${product.name} -> ${msg}`);
        }
    }

    console.log(`\nDone. ${ok} succeeded, ${failed} failed.`);
}

main();

// (this file uses ESM import/export syntax to match your backend's
// "type": "module" setting in package.json)