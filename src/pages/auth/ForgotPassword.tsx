import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement password reset logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setIsEmailSent(true);
    } catch (error) {
      console.error("Failed to send reset email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {isEmailSent ? "Check your email" : "Reset your password"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isEmailSent
            ? "We have sent you instructions to reset your password."
            : "Enter your email address and we'll send you a link to reset your password."}
        </p>
      </div>

      {!isEmailSent ? (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5 text-gray-400" />}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset instructions"}
          </Button>
        </form>
      ) : (
        <Link to="/login" className="inline-block w-full">
          <Button variant="outline" className="w-full mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Button>
        </Link>
      )}

      {!isEmailSent && (
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Back to login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
