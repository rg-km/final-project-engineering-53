import { Avatar, Divider, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { FiHome, FiBookOpen, FiUsers } from 'react-icons/fi'
// import { IoPawOutline } from 'react-icons/io5'
import NavItem from "./NavItem";

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex 
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flrxDir="column"
                w="100%"
                alignItems="flex-start"
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    {/* profil picture */}
                    <Avatar size="sm" src="jpg" /> 
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Username</Heading>
                        <Text>Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
            
            <Flex
                p="5%"
                flexDir="column"
                alignItems="flex-start"
                as="nav"
            >
                <IconButton 
                    background="none"
                    mt={5}
                    _hover={{ background: 'none'}}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Home" description="" />
                <NavItem navSize={navSize} icon={FiBookOpen} title="Material" description="" />
                <NavItem navSize={navSize} icon={FiUsers} title="User" description="" />
            </Flex>
        </Flex>
    )
}