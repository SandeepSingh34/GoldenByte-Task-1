import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

let Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setcnfPassword] = useState("");
    const [UserType, setUserType] = useState("");
    const [error, setError] = useState(null);

    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Email is required');
            return;
        }
        else if (!password) {
            setError("fill password")
        }
        else if (!cnfPassword) {
            setError("fill confirm password")
        }

        else if (password !== cnfPassword) {
            setError('Password not match');
            return;
        }
        else if (!UserType) {
            setError("Please select user type")
        }
        else {
            setError(null);
            console.log(email, password, cnfPassword, UserType)
        }

        try {
            const response = await fetch('http://localhost:5002/api/Signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, cnfPassword, UserType }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            const token = data.token;
            console.log(token);
            // Save token to localStorage or sessionStorage
            localStorage.setItem('token', token);
            localStorage.setItem("user", data.email);
            localStorage.setItem("userType", data.userType);

            // Redirect user to dashboard or perform other actions
            console.log('User logged in successfully');
            navigator("/Dashboard", { replace: true })

        } catch (error) {
            setError(error.message);
        }

    };


    return (
        <>
            <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to GoldenByte
                    </h2>

                </div>

                <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="mb-2 text-red-700 text-center font-semibold text-md">
                            {error && <div className="error-message">{error}</div>}
                        </div>
                        <form class="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div class="mt-1">
                                    <input id="email" name="email" type="email" autocomplete="email" value={email} onChange={(e) => setEmail(e.target.value)}

                                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your email address" />
                                </div>
                            </div>

                            <div>
                                <label for="password" class="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div class="mt-1">
                                    <input id="password" name="password" type="password" autocomplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your password" />
                                </div>
                            </div>

                            <div>
                                <label for="cnfpassword" class="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div class="mt-1">
                                    <input id="cnfpassword" name="cnfPassword" type="password" autocomplete="current-password" value={cnfPassword} onChange={(e) => setcnfPassword(e.target.value)}
                                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your password" />
                                </div>
                            </div>

                            <div>

                                <div class="mt-1">
                                    <select onChange={(e) => setUserType(e.target.value)} className="appearance-none rounded-md relative block w-2/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                                        <option value="">Select User Type</option>
                                        <option value="type-1">User-Type-1</option>
                                        <option value="type-2">User-Type-2</option>
                                    </select>

                                </div>
                            </div>



                            <div>
                                <button type="submit"
                                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Sign-up
                                </button>
                            </div>
                        </form>
                        <div class="mt-9 flex justify-center">
                            yet Member ?
                            <Link exact to="/login" class="font-medium text-blue-600 hover:text-blue-500">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration