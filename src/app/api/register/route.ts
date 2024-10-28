import User from "../../../../models/User";
import connect from "../../../../lib/mongodb";

export const POST = async (request: any) => {
    const { email, username, password } = await request.json();

    await connect();
}