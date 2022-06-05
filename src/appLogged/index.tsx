import {
    Box,
    Grid,
    GridItem,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Image,
    Tr,
    Flex,
    ModalContent,
    FormLabel,
    Input,
    ModalHeader,
    Textarea,
    Button,
    ModalOverlay,
    Avatar,
    ModalBody,
    Modal,
    Divider, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import SidebarWithHeader from '../layoutTemplates/sideBar';
import SubscribedTextBox from "../subcribedText";
import {Form, Formik, Field} from "formik";
import {useMutation, useQuery} from "react-query";
import {setCookies} from "../login";
import {getSystems} from "../api";

const LeftSide = () => {
    return (
        <Box bg={'gray.50'} borderRadius={'16px'}>
            <Flex justify={'center'} pb={4} w={'120px'} h={'120px'} margin={'auto'} pt={4}>
                <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' borderRadius={'12px'}/>
            </Flex>

            <TableContainer>
                <Table variant='simple'>

                    <Thead>
                        <Tr>
                            <Th>Parameter</Th>

                            <Th>Value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>

                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>

                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>

                        </Tr>
                    </Tbody>

                </Table>
            </TableContainer>
        </Box>
    )
}


const RightSide = () => {
    return (
        <Box>
            <SubscribedTextBox height={'70vh'}/>
        </Box>
    )
}


const LoggedApp = () => {
    const query = useQuery<any, any, any, any>('todos', async () => {

        return await getSystems();
    })
    console.log(query)
    return (
        <div>
            <SidebarWithHeader>
                <Grid templateColumns='repeat(4, 1fr)' gap={4}>
                    <GridItem colStart={1} colEnd={3} h='10' bg=''>
                        <LeftSide/>
                    </GridItem>
                    <GridItem colStart={3} colEnd={6} h='10'>
                        <RightSide/>
                    </GridItem>
                </Grid>
            </SidebarWithHeader>
        </div>
    );
};

export default LoggedApp;