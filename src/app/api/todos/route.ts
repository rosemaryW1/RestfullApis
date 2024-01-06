import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
    const res = await fetch(DATA_SOURCE_URL);

    const todos: Todo[] = await res.json();

    return NextResponse.json(todos);
}
  
export async function DELETE(request: Request) {
    const { id }: Partial<Todo> = await request.json();

    if(!id) return NextResponse.json({ message: "Todo id required" });

    await fetch(`${DATA_SOURCE_URL}/${id}`, { 
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "API-Key":API_KEY}
         });

    return NextResponse.json({ "message": `Todo ${id} deleted successfully`})
}
export async function POST(request: Request) {
    const { userId, title }: Partial<Todo> = await request.json();

    if(!userId || !title) return NextResponse.json({ message: "Todo userId ot title required" });

    const res = await fetch(DATA_SOURCE_URL, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "API-Key":API_KEY},
         
         body: JSON.stringify({
             userId, title, completed: false })
});

const newTodo: Todo = await res.json();

return NextResponse.json(newTodo)
}