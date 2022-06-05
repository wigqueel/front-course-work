import {AnimatePresence, AnimateSharedLayout, motion} from "framer-motion";
import {Box, Button, Flex} from "@chakra-ui/react";
import {useState} from "react";

const SubscribedTextBox = ({height}: { height: any }) => {
    const [data, setData] = useState(["aaa", "bbb", "ccc", "ddd"]);
    const deleteElem = () =>
        data.length >= 7 ? setData((data) => [...data.slice(1)]) : {};
    const addElem = () => {
        setTimeout(() => setData((data) => [...data, `${Date.now()}`]), 250);

        setTimeout(() => deleteElem(), 50);
    };

    const variants = {
        pre: {opacity: 0, y: -10},
        visible: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -10},
    };
    const style = {
        display: "flex",
        flexDirection: "column-reverse",
    };

    return (
        <>
            <Box
                height={height}
                overflow={"hidden"}
                borderRadius={"10px"}
                bg={"gray.50"}
                py={2}
            >
                {/* @ts-ignore:next-line */}
                <AnimateSharedLayout type="crossfade">
                    {/* @ts-ignore:next-line */}
                    <motion.ul layout style={style}>
                        <AnimatePresence>
                            {data.map((el, i) => (
                                <motion.li
                                    layout
                                    variants={variants}
                                    initial="pre"
                                    animate="visible"
                                    exit="exit"
                                    key={i}
                                >
                                    <Flex justify={'center'} pl={4} color="gray.400" my={1} mx={2} p={1}
                                          border={'1px #DCDCDC solid'} borderRadius={'12px'}>
                                        {el}
                                    </Flex>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </motion.ul>
                </AnimateSharedLayout>
            </Box>
            <Button onClick={addElem} mt={2} bg={'red'}/>
        </>
    );
};

export default SubscribedTextBox;
