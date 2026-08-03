import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from "../components/NewsLetterBox.jsx";

const About = () => {
	return (
		<div>
			<div className='text-2xl text-center pt-8 border-t'>
				<Title text1={'ABOUT'} text2={'US'} />
			</div>
			<div className="my-10 flex flex-col md:flex-row gap-16">
				<img className='w-full md:max-w-112.5' src={assets.about_img} />
				<div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
					<p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur assumenda reprehenderit doloremque cumque? Facilis id quae dolor velit deserunt, eius consequatur corporis vitae ad maxime! Sed iste quod distinctio dolor. </p>
					<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut condimentum enim. Quisque in porta augue, blandit suscipit purus. Donec felis elit, mollis cursus enim in, pellentesque maximus massa. Nunc facilisis sodales lorem, vel mattis augue sagittis ut. Proin eu metus sit amet diam dignissim congue. Donec placerat nulla varius, feugiat sapien id, iaculis dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin aliquam placerat elit sed dictum. Sed iste quod distinctio dolor. </p>
					<b className='text-gray-800'> Our Mission </b>
					<p> Pellentesque rutrum ex vitae dui ornare, at pharetra urna porttitor. Suspendisse elit nibh, tincidunt non massa et, tempus vulputate lacus. Praesent aliquet leo et justo aliquam, non condimentum enim pulvinar. Nunc at sem nunc. Aenean vehicula vel eros quis mattis. Aliquam erat volutpat. Praesent pretium risus sed lobortis imperdiet. </p>
				</div>
			</div>
			<div className='text-4xl py-4'>
				<Title text1={'WHY'} text2={'CHOOSE US'} />
			</div>
			<div className='flex flex-col md:flex-row text-sm mb-20'>
				<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
					<b> Quality Assurance: </b>
					<p className={'text-gray-600'}> Tempus vulputate lacus. Praesent aliquet leo et justo aliquam, non condimentum enim pulvinar. Nunc at sem nunc. Aenean vehicula </p>
				</div>
				<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
					<b> Convenience: </b>
					<p className={'text-gray-600'}> Tempus vulputate lacus. Praesent aliquet leo et justo aliquam, non condimentum enim pulvinar. Nunc at sem nunc. Aenean vehicula </p>
				</div>
				<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
					<b> Exceptional Customer Service: </b>
					<p className={'text-gray-600'}> Tempus vulputate lacus. Praesent aliquet leo et justo aliquam, non condimentum enim pulvinar. Nunc at sem nunc. Aenean vehicula </p>
				</div>
			</div>
			<NewsLetterBox/>
		</div>
	)
}

export default About