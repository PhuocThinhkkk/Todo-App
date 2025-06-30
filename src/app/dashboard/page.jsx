"use client"
import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const Dashboard = () => {

    const data = [
        { name: "Jan", total: 1200 },
        { name: "Feb", total: 1500 },
        { name: "Mar", total: 1800 },
        { name: "Apr", total: 2200 },
        { name: "May", total: 2500 },
        { name: "Jun", total: 2800 },
    ]; 
    return (
        <div className='flex-col rounded-2xl border'>
            <h1 className='font-bold text-3xl'> Your activity in a week </h1>
            <h2 className='font-light text-xl'> Average: </h2>
            <div className='mx-auto'>
            
            </div>

        </div>
    )
}

export default Dashboard