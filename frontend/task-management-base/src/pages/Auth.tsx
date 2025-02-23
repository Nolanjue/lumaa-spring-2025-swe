import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger }  from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from "../ui/input";
import { Button } from '../ui/button';
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2 } from "lucide-react";

interface AuthError {
  message: string;
}

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, type: 'login' | 'register') => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const username =  formData.get('username') as string
    const password = formData.get('password') as string;
    console.log(username)

    try {
      const response = await fetch(`${process.env.FRONTENDURL}/auth/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password}),
        credentials: 'include', // This ensures cookies are sent with the request
      });

      const data = await response.json();
      console.log("data", data)
      if (!response.ok) {
     
        alert("Authentication issue, please try again")
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      
      navigate('/Tasks')
    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'An unexpected error occurred' 
      });
     
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-screen h-screen items-center align-center bg-gray-50 p-8">
      <Card className="w-1/2 mx-auto h-100vh space-y-2 ">
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>Get your stuff done</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full ">
            <TabsList className="rounded-none h-10 border-black grid w-full grid-cols-2 space-x-5">
              <TabsTrigger className = "rounded-sm bg-gray-400 text-black" value="login">Login</TabsTrigger>
              <TabsTrigger className = "rounded-sm bg-gray-400 text-black" value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent className = 'space-y-5'value="login">
              <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Username </Label>
                  <Input
                    id="login-username" 
                    name="username"
                    type="text"
                    className = 'border-black'
                    placeholder="Johnny"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                     placeholder="T@sK134"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={(e) => handleSubmit(e, 'register')} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="register-username">Username </Label>
                  <Input
                    id="register-username"
                    name="username"
                    type="text"
                    className = 'border-black'
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    name="password"
                    type="password"
                     placeholder="T@sK134"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;