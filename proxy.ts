import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminLogin = path === "/admin/login";
  const hasAdminToken = Boolean(request.cookies.get("admin_token")?.value);

  if (path.startsWith("/admin") && !isAdminLogin && !hasAdminToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isAdminLogin && hasAdminToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
