import Sidebar from "./Sidebar"
import { Flex } from "@chakra-ui/react"

function Home ({ Component, pageProps }) {
    return (
        <Flex>
            <Sidebar />
        </Flex>
    )
}

export default Home