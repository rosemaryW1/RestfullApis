import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");

    const todos: Todo[] = await res.json();

    return NextResponse.json(todos);
}
  