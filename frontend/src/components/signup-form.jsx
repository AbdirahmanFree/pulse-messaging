import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "./reui/phone-input";

export function SignupForm({
  ...props
}) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e)=>{props.handleSubmit(e)}}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input id="firstName" type="text" placeholder="Abdirahman" required onChange={(e)=> {props.setFirstName(e.target.value)}} />
            </Field>
            <Field>
              <FieldLabel htmlFor="firstName">Last Name</FieldLabel>
              <Input id="lastName" type="text" placeholder="Abdulahi" required onChange={(e)=> {props.setLastName(e.target.value)}} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Phone Number</FieldLabel>
              <PhoneInput id="phoneNumber" onChange={(value)=>{props.setPhoneNumber(value)}}/>
              <FieldDescription>
                We will not share your phone number
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required onChange={(e)=> {props.setPassword(e.target.value)}} />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required onChange={(e)=> {props.setConfirmPassword(e.target.value)}} />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
