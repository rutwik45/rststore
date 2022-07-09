import {Link as RouterLink} from 'react-router-dom'
import {Link,Box,Image,Heading,Flex,Text} from '@chakra-ui/react'
import Rating from './Rating'

const ProductCard=({product})=>{
    return(
        <Link as={RouterLink} 
        to={`/product/${product._id}`}
        _hover={{textDecor:'none'}}>
            <Box maxW='sm'
            bgColor='white'
            overflow='hidden'
            _hover={{shadow:'md'}}>
                <Image src={product.image} 
                alt={product.name}
                height='400'
                objectFit='cover'
                border='1px solid black'
                />
                <Flex py='5' px='4' direction='column' justifyContent='space-between' height='120'
                border='1px solid black'>
                    <Heading as='h4' fontSize='lg' mb='3'>
                        {product.name}
                    </Heading>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <Rating value={product.rating} />
                        <Text fontSize='2xl' fontWeight='bold' color='blue.600'>
                            ₹{product.price}
                        </Text>
                    </Flex>
                </Flex>

            </Box>
        </Link>
    )
}
export default ProductCard