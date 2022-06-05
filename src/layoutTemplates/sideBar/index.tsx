import React, {ReactNode, ReactText, useState} from 'react';
import {
    Avatar,
    Box,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    HStack,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    Image,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Divider,
    ModalBody,
    FormLabel,
    Input,
    Textarea, Button,
} from '@chakra-ui/react';
import {FiBell, FiChevronDown, FiCompass, FiHome, FiMenu, FiSettings, FiStar, FiTrendingUp,} from 'react-icons/fi';
import {GrBike} from 'react-icons/gr'
import {IconType} from 'react-icons';
import {AddIcon} from '@chakra-ui/icons';
import {Field, Form, Formik} from "formik";

interface LinkItemProps {
    name: string;
    icon: IconType;
}


export default function SidebarWithHeader({
                                              children,
                                          }: {
    children: ReactNode;
}) {
    const {isOpen, onOpen, onClose} = useDisclosure();


    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    const [linkItems, setLinkItems] = useState<Array<LinkItemProps>>([
            {name: 'Bike', icon: GrBike},

        ]
    )

    const {
        isOpen: isOpenModalPageOne,
        onOpen: onOpenModalPageOne,
        onClose: onCloseModalPageOne,
    } = useDisclosure();
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="center">

                <Image src={"/Logo2.png"} w={20}/>


                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>

            {linkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} border={'1px #DCDCDC solid'} borderRadius={'12px'}>
                    {link.name}
                </NavItem>
            ))}
            <Flex justifyContent={'center'} mt={4} onClick={onOpenModalPageOne} cursor={'pointer'}>
                <AddIcon w={8} h={8} color={'gray.300'}/>
            </Flex>
            <AddModal setLinkItems={setLinkItems} isOpenModalPageOne={isOpenModalPageOne}
                      onCloseModalPageOne={onCloseModalPageOne}
                      onOpenModalPageOne={onOpenModalPageOne}

            />
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}

const NavItem = ({icon, children, ...rest}: NavItemProps) => {
    return (
        <Link href="#" style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({onOpen, ...rest}: MobileProps) => {
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell/>}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">Justina Clark</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider/>
                            <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};


const AddModal = ({
                      isOpenModalPageOne,
                      onOpenModalPageOne,
                      onCloseModalPageOne,
                      setLinkItems
                  }: any) => {


    return (
        <Modal
            onClose={onCloseModalPageOne}
            isOpen={isOpenModalPageOne}
            isCentered
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add new system</ModalHeader>
                <ModalCloseButton

                />
                <Divider/>
                <ModalBody>
                    <Formik
                        onSubmit={async (values, {setSubmitting}) => {
                            console.log(values)
                        }}
                        initialValues={{
                            name: "",
                            description: ""

                        }}
                    >
                        {({handleSubmit, setFieldValue}) => (
                            <Form onSubmit={handleSubmit}>

                                <Field name={"name"}>
                                    {({field, form}: { field: any, form: any }) => (
                                        <Box py={2}>
                                            <FormLabel htmlFor="name">
                                                {" "}
                                                Full name
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                id="name"
                                                placeholder="Full Name"
                                            />
                                        </Box>
                                    )}
                                </Field>
                                <Field name={"description"}>
                                    {({field, form}: { field: any, form: any }) => (
                                        <Box py={2}>
                                            <FormLabel htmlFor="name">
                                                {" "}
                                                Description
                                            </FormLabel>
                                            <Textarea
                                                placeholder="Here is a sample placeholder"
                                                size="sm"
                                                {...field}
                                            />
                                        </Box>
                                    )}
                                </Field>
                                <Flex direction="row-reverse">

                                    <Button
                                        type="submit"
                                        mt={4}
                                        mb={2}
                                        colorScheme={"green"}
                                    >
                                        Save
                                    </Button>

                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
