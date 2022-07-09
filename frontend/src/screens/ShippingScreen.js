import { useState,useEffect } from "react";
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import {Button,Flex,
Heading,FormControl,FormLabel,
Input,Spacer,Select} from '@chakra-ui/react'
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps"; 
import countryNames from '../data/countryNames' 

const ShippingScreen=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart

    const [address,setAddress]=useState(shippingAddress.address || '')
    const [city,setCity]=useState(shippingAddress.city || '')
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode || '')
    const [country,setCountry]=useState(shippingAddress.country || '')

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment')
    }
    return(
        <Flex w='full' alignItems='center' justifyContent='center' py='5'>
            <FormContainer>
                <CheckoutSteps step1 step2>

                </CheckoutSteps>

                <Heading as='h2' mb='8' fontSize='3xl'>Shipping</Heading>

                <form onSubmit={submitHandler}>
                    <FormControl id='address'>
                        <FormLabel htmlFor='address'>Address</FormLabel>
                        <Input
                        id='address'
                        type='text'
                        placeholder='Your Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                    </FormControl>

                    <Spacer h='3'/>
                    <FormControl id='city'>
                        <FormLabel htmlFor='city'>City</FormLabel>
                        <Input
                        id='city'
                        type='text'
                        placeholder='Your City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        />
                    </FormControl>
                    <Spacer h='3'/>

                    <FormControl id='postalCode'>
                        <FormLabel htmlFor='postalCode'>Postal Code</FormLabel>
                        <Input
                        id='postalCode'
                        type='text'
                        placeholder='Your Postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </FormControl>

                    <Spacer h='3'/>
                    <FormControl id='country'>
                        <FormLabel htmlFor='country'>Country</FormLabel>
                        <Select onChange={(e)=>{setCountry(e.target.value)}}>
                            {countryNames.map((country,i)=>(
                                <option key={i}>{country}</option>
                            ))}
                        </Select>
                    </FormControl>


                    <Spacer h='3'/>
                    <Button type="submit" colorScheme='teal' mt='4'>
                        Continue
                    </Button>






                </form>
            </FormContainer>

        </Flex>
    )

}
export default ShippingScreen