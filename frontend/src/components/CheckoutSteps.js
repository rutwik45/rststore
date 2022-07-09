import {Link as RouterLink} from 'react-router-dom'
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,
Flex} from '@chakra-ui/react'
import { IoCaretForwardSharp } from 'react-icons/io5'

const CheckoutSteps=({step1,step2,step3,step4})=>{
    return(
        <Flex justifyContent='center' mb='8' >
            <Breadcrumb separator={<IoCaretForwardSharp color='gray.500'/>}>
                <BreadcrumbItem>
                    {step1 ? (
                        <BreadcrumbLink>Login</BreadcrumbLink>
                    ):(
                        <BreadcrumbLink
                        disabled color='gray.400'
                        _hover={{textDecor:'none'}}></BreadcrumbLink>
                    )}
                </BreadcrumbItem>

                <BreadcrumbItem>
                        {step2 ? (
                            <BreadcrumbLink as={RouterLink} to='/shipping'>
                                Shipping
                            </BreadcrumbLink>
                        ):(
                            <BreadcrumbLink
                            disabled
                            color='gray.400'
                            _hover={{textDecor:'none'}}>
                                shipping
                            </BreadcrumbLink>
                        )}
                </BreadcrumbItem>

                <BreadcrumbItem>
                        {step3 ? (
                            <BreadcrumbLink as={RouterLink} to='/payment'>
                                payment
                            </BreadcrumbLink>
                        ):(
                            <BreadcrumbLink
                            disabled
                            color='gray.400'
                            _hover={{textDecor:'none'}}>
                                payment
                            </BreadcrumbLink>
                        )}
                </BreadcrumbItem>

                <BreadcrumbItem>
                        {step4 ? (
                            <BreadcrumbLink as={RouterLink} to='/placeorder'>
                                Place Order
                            </BreadcrumbLink>
                        ):(
                            <BreadcrumbLink
                            disabled
                            color='gray.400'
                            _hover={{textDecor:'none'}}>
                                Place Order
                            </BreadcrumbLink>
                        )}
                </BreadcrumbItem>
            </Breadcrumb>
        </Flex>
    )
}
export default CheckoutSteps