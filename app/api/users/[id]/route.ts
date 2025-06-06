import { dbConnect } from '@/lib/db'
import { UserService } from '@/lib/services/UserService'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()

        const { id } = await context.params

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        const user = await UserService.findUser(id);

        return NextResponse.json({ user })

    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}