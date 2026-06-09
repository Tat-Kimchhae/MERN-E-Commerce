import React from 'react'
import Title from '../components/Title'

const PlaceOrder = () => {
	return (
		<div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
			{/* Left side */}
			<div className="flex flex-col gap-4 w-full sm:max-w-120">
				<div className="text-xl sm:text-2xl my-3">
					<Title text1={'DELIVERY'} text2={'INFOMATION'}/>
				</div>
			</div>
		</div>
	)
}

export default PlaceOrder