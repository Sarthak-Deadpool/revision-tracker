/** @format */

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl">
          Revision Tracker
        </CardTitle>

        <CardDescription>
          Sign in to continue your revision journey.
        </CardDescription>

      </CardHeader>

      <CardContent>
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button className="w-full">Login</Button>
           <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
