import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const backendUrl = process.env.JAVA_BACKEND_URL ?? "http://localhost:8080";
type RouteContext = { params: Promise<{ path: string[] }> };

async function forward(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const pathName = path.join("/");

  if (pathName === "auth/logout" && request.method === "POST") {
    const response = NextResponse.json({ message: "Logged out." });
    response.cookies.delete("admin_token");
    return response;
  }

  const targetUrl = `${backendUrl}/api/admin/${pathName}${new URL(request.url).search}`;
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token")?.value;
  const headers = new Headers();
  const contentType = request.headers.get("content-type");

  if (contentType) headers.set("Content-Type", contentType);
  if (adminToken) headers.set("Authorization", `Bearer ${adminToken}`);

  let backendResponse: Response;
  try {
    backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "The CMS service is temporarily unavailable." },
      { status: 503 },
    );
  }

  const responseText = await backendResponse.text();
  let responseBody: unknown = {};
  try {
    responseBody = responseText ? JSON.parse(responseText) : {};
  } catch {
    responseBody = { error: "The CMS service returned an invalid response." };
  }

  if (pathName === "auth/login" && backendResponse.ok && typeof responseBody === "object" && responseBody) {
    const loginBody = responseBody as { accessToken?: unknown; user?: unknown };
    if (typeof loginBody.accessToken === "string") {
      const response = NextResponse.json({ user: loginBody.user }, { status: backendResponse.status });
      response.cookies.set("admin_token", loginBody.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 8,
      });
      return response;
    }
  }

  return NextResponse.json(responseBody, { status: backendResponse.status });
}

export async function GET(request: Request, context: RouteContext) {
  return forward(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  return forward(request, context);
}

export async function PUT(request: Request, context: RouteContext) {
  return forward(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return forward(request, context);
}

export async function DELETE(request: Request, context: RouteContext) {
  return forward(request, context);
}
