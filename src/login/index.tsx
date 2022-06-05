import {Field, Formik} from "formik";
import {Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import request, {login} from "../api";
import {useMutation} from "react-query";

interface useLoginType {
    username: string,
    password: string,
}


interface responseLogin {
    token: string;
}

export const setCookies = (token: string) => {
    document.cookie = `token=${token}`;
}

export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) { // @ts-ignore
        return parts.pop().split(';').shift();
    }
}

const Login = () => {
    const navigate = useNavigate()
    const mutation = useMutation<any, any, any, any>('todos', async (props: useLoginType) => {

        return await login(props);
    }, {
        onSuccess: ({token}: responseLogin, variables, context) => {
            console.log(token)
            setCookies(token)
        }
    })

    return (

        <Flex bg="white.100" align="center" justify="center" h="100vh">
            <Box bg="white" p={6} rounded="md" w={64}>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={(values: useLoginType) => {
                        try {
                            mutation.mutate(values)
                            navigate('app')

                        } catch (e) {
                            console.log(e)
                        }

                        //alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {({handleSubmit, errors, touched}) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl>
                                    <FormLabel htmlFor="email">Username</FormLabel>
                                    <Field
                                        as={Input}
                                        id="username"
                                        name="username"
                                        type="username"
                                        variant="filled"
                                    />
                                </FormControl>
                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type="password"
                                        variant="filled"
                                        validate={(value: any) => {
                                            let error;

                                            if (value.length < 5) {
                                                error = "Password must contain at least 6 characters";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                                <Field
                                    as={Checkbox}
                                    id="rememberMe"
                                    name="rememberMe"
                                    colorScheme="purple"
                                >
                                    Remember me?
                                </Field>
                                <Button type="submit" colorScheme="purple" width="full">
                                    Login
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
}

export default Login;