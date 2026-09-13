import { NextRequest } from "next/server";
import { POST as handlePost, GET as handleGet } from "../route";

export async function POST(request: NextRequest) {
  return handlePost(request);
}

export async function GET(request: NextRequest) {
  return handleGet(request);
}
