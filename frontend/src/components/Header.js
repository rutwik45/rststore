import { useState } from "react"
import {Link as RouterLink,useNavigate} from 'react-router-dom'
import { Flex,Heading,Link,Box,Icon,Menu,
MenuButton,MenuList,MenuItem,Button,} from "@chakra-ui/react"
import {HiShoppingCart,HiMenuAlt3,HiUsers} from 'react-icons/hi'
import {IoChevronDown} from 'react-icons/io5'
import { useDispatch,useSelector } from "react-redux"
import {logout} from '../actions/userActions'
const Header=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [show,setShow]=useState(false);

    const userLogin=useSelector((state)=>state.userLogin);
    const {userInfo}=userLogin

    const userUpdate=useSelector((state)=>state.userUpdateProfile)
    const {user}=userUpdate

    const logoutHandler=()=>{
        dispatch(logout());
        navigate('/')
    }
    return(
        <Flex as='header'
            align='center'
            justify='space-between'
            wrap='wrap'
            py='6'
            px='6'
            bgColor='gray.800'
            w='100%'
            top='0'
            pos='fixed'
            zIndex='2'>
            <Flex align='center'>
                <Heading as='h1'
                        color='whiteAlpha.900'
                        fontWeight='bold'
                        size='md'
                        letterSpacing='md'>
                        <Link as={RouterLink}
                        to='/'
                        _hover={{color:'yellow',textDecor:'none'}}>RST STORE</Link>
                </Heading>
            </Flex>
            <Box display={{base:'block',md:'none',sm:'block'}}
            onClick={()=>setShow(!show)}>
                <Icon as={HiMenuAlt3} color='white' w='6' h='6' />
            </Box>
            <Box display={{base:show?'block':'none',md:'flex'}}
            width={{base:"full",md:'auto'}}
            alignItems='center'>
                <Link as={RouterLink}
                to='/cart'
                fontSize='sm'
                letterSpacing='wide'
                color='white'
                fontWeight='bold'
                textTransform='uppercase'
                mr='5'
                display='flex'
                alignItems='center'
                _hover={{color:'yellow',textDecor:'none'}}>
                   <Icon as={HiShoppingCart} mr='1' w='4' h='4' /> Cart</Link>

                
                {userInfo ? (
                    <Menu>
                        <MenuButton as={Button}
                        rightIcon={<IoChevronDown/>}
                        _hover={{textDecoration:'none',opacity:'0.7'}}>
                            {userInfo.name}

                        </MenuButton>
                        <MenuList>
                            <MenuItem as={RouterLink} to='/profile'>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                ):(
                    <Link as={RouterLink}
                to='/login'
                fontSize='sm'
                letterSpacing='wide'
                color='white'
                fontWeight='bold'
                textTransform='uppercase'
                mr='5'
                display='flex'
                alignItems='center'
                _hover={{color:'yellow',textDecor:'none'}}>
                    <Icon as={HiUsers} mr='1' w='4' h='4' /> Login
                    </Link>
                )}

                {userInfo && userInfo.isAdmin && (
                        <Menu>
                            <MenuButton
                            ml='5'
                            color='white'
                            fontSize='sm'
                            fontWeight='semibold'
                            as={Link}
                            textTransform='uppercase'
                            _hover={{ textDecoration: 'none', opacity: '0.7' }}
                            >
                            Manage <Icon as={IoChevronDown} />
                            </MenuButton>
                            <MenuList>
                            <MenuItem as={RouterLink} to='/admin/userlist'>
                                All Users
                            </MenuItem>
                            <MenuItem as={RouterLink} to='/admin/productlist'>
                                All Products
                            </MenuItem>
                            <MenuItem as={RouterLink} to='/admin/orderlist'>
                                All Orders
                            </MenuItem>
                            </MenuList>
                        </Menu>
                        )}

            </Box>
        </Flex>
    )
}
export default Header