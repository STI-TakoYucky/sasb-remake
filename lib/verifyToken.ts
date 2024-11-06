'use client'

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const verifyToken = (token: string) => {
    
    const JWT_SECRET_KEY = process.env.JWT_SECRET

    if(!JWT_SECRET_KEY) {
        return NextResponse.json({message: "No Secret Key found"}, {status: 404})
    }

    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
}