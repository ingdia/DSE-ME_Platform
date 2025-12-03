import PrimaryButton from '@/components/PrimaryButton'
import React from 'react'

function page() {
    return (
        // <div className="flex justify-between items-center w-full">
        // {/* <div className=' text-black font-bold'>
        //     <p>Enter and confirm your  new password
        //          to complete the  reset process.</p>
        // </div> */}
        <div className='p-18  '>
            <h1 className='text-[32px] font-bold  bg-gradient-to-t from-[#0B609D] to-[#666666] bg-clip-text text-transparent'>Reset Your Password</h1>
            <h2 className='font-semibold'>Enter and confirm your new password to access your account...</h2>

            <form action="" className='py-12'>
                <label>New Password</label><br />
                <input type="text" /><br />
                <label>Confirm Password</label>
                <div className='py-8'>
                <PrimaryButton label="Reset Password"/>
                </div>
            </form>
        </div>
        // </div>
    )
}

export default page
