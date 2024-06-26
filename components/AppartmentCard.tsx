// ./components/AppartmentCard.tsx
'use client'
import React from 'react';
import { Lejlighed } from '../queries/lejlighed';
import { CardFooter, Image } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import Carousel from './carusel';
import './css/ribbon.css'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Heading,
  Text,
  Card,
  CardBody,
  Stack,
  Box,
  Wrap,
  
} from '@chakra-ui/react'
import { AspectRatio } from '@chakra-ui/react'

import { PiLayout } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoPricetagOutline } from "react-icons/io5";
import { CiVault } from "react-icons/ci";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdOutlineEventAvailable } from "react-icons/md";

// Ribbon component
const Ribbon = ({ text }) => {
    return (
      <div className="ribbon">
        <span>{text}</span>
      </div>
    );
  };

interface AppartmentProps {
  lejlighed: Lejlighed;
}

const AppartmentCard: React.FC<AppartmentProps>=({lejlighed}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const encodedLatitude = encodeURIComponent(lejlighed.beliggenhed.latitude);
  const encodedLongitude = encodeURIComponent(lejlighed.beliggenhed.longitude);
  const today = new Date();
  

  return (
    
      <Card onClick = {onOpen} variant={'elevated'} borderWidth={{ base:'2px', sm: '3px', md:'4px'}} borderRadius="lg" backgroundColor='#EDF2F7' borderColor={'#E2E8F0'} _hover={{ cursor: 'pointer' }}> 
       {lejlighed.status == true && (
            <Ribbon text="Udlejet" />
        )}
      <CardBody>
        
          <Image objectFit='cover' aspectRatio={4/3} src = {lejlighed.billeder[0]?.url} style={{ width: '100%', height: 'auto' }} />
        
          <Heading size={['sm','sm','md']} mt={4}>{lejlighed.navn}</Heading>
      </CardBody>
          <CardFooter justify={'space-between'} flexWrap={'wrap'}>
              <Flex align="center" flexDirection="column"> {/* Flex container to align items vertically */}
                  <Flex align="center"> {/* Flex container to align items horizontally */}
                  <PiLayout  />
                  <Text  whiteSpace="pre-line" ml={2}>{lejlighed.vrelser}</Text> {/* Text */}
                  </Flex>
                  <Text  textAlign="center">Værelser</Text> {/* Centered text */}
              </Flex>
              <Flex align="center" flexDirection="column"> {/* Flex container to align items vertically */}
                  <Flex align="center"> {/* Flex container to align items horizontally */}
                  <SlSizeFullscreen />
                  <Text  whiteSpace="pre-line" ml={2}>{lejlighed.kvadratmeter} m2</Text> {/* Text */}
                  </Flex>
                  <Text  textAlign="center">Bolig areal</Text> {/* Centered text */}
              </Flex>
              <Flex align="center" flexDirection="column"> {/* Flex container to align items vertically */}
                  <Flex align="center"> {/* Flex container to align items horizontally */}
                  <IoPricetagOutline />
                  <Text whiteSpace="pre-line" ml={2} color={lejlighed.status ? "white" : 'black'}>
                    {lejlighed.status ? "XXXX" : lejlighed.mnedlig_leje + " kr"}
                  </Text>
                  </Flex>
                  <Text  textAlign="center">Pris</Text> {/* Centered text */}
              </Flex>
          </CardFooter>

          <Modal isOpen={isOpen} onClose={onClose} motionPreset='scale' size ={{ base:'sm', sm: 'xl', md:'3xl'}} scrollBehavior={'inside'}>
              
              <ModalOverlay       
              bg='blackAlpha.700'
              backdropFilter='auto'
              backdropInvert='20%'
              backdropBlur='2px'
              />
              <ModalContent backgroundColor={'GhostWhite'} justifyContent={'center'}>
              <ModalHeader fontSize={'3xl'} fontWeight={'700'}>{lejlighed.navn}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <Carousel
                      cards={lejlighed.billeder.map((billede) => billede.url)}
                  />
                  <Wrap justify={'space-between'} flexWrap={'wrap'} mt={4}>
                      <Flex align="center" flexDirection="column"> {/* Flex container to align items vertically */}
                          <Flex align="center"> {/* Flex container to align items horizontally */}
                          <PiLayout color='black' />
                          <Text color='black' whiteSpace="pre-line" ml={2}>{lejlighed.vrelser}</Text> {/* Text */}
                          </Flex>
                          <Text color='black' textAlign="center">Værelser</Text> {/* Centered text */}
                      </Flex>
                      <Flex align="center" flexDirection="column"> {/* Flex container to align items vertically */}
                          <Flex align="center"> {/* Flex container to align items horizontally */}
                          <SlSizeFullscreen color='black'/>
                          <Text color='black' whiteSpace="pre-line" ml={2}>{lejlighed.kvadratmeter} m2</Text> {/* Text */}
                          </Flex>
                          <Text color='black' textAlign="center">Bolig areal</Text> {/* Centered text */}
                      </Flex>
                      <Flex align="center" flexDirection="column"> {/* Flex container to align items vertically */}
                          <Flex align="center"> {/* Flex container to align items horizontally */}
                          <MdOutlineEventAvailable color='black'/>
                          <Text whiteSpace="pre-line" ml={2} color={lejlighed.status ? "white" : 'black'}>
                            
                          {lejlighed.status ? "XXXX" : (!lejlighed.ledig_pr || new Date(lejlighed.ledig_pr) < today ? "Nu" : lejlighed.ledig_pr + "")}
                          </Text>
                          </Flex>
                          <Text color='black' textAlign="center">Ledig fra</Text> {/* Centered text */}
                      </Flex>
                      <Flex align="center" flexDirection="column"> {/* Flex container to align items vertically */}
                          <Flex align="center"> {/* Flex container to align items horizontally */}
                          <CiVault color='black'/>
                          <Text whiteSpace="pre-line" ml={2} color={lejlighed.status ? "white" : 'black'}>
                            {lejlighed.status ? "XXXX" : lejlighed.depositum + " mdr"}
                          </Text>
                          </Flex>
                          <Text color='black' textAlign="center">Depositum</Text> {/* Centered text */}
                      </Flex>
                      <Flex align="center" flexDirection="column"> {/* Flex container to align items vertically */}
                          <Flex align="center"> {/* Flex container to align items horizontally */}
                          <LiaFileInvoiceDollarSolid color='black'/>
                          <Text whiteSpace="pre-line" ml={2} color={lejlighed.status ? "white" : 'black'}>
                            {lejlighed.status ? "XXXX" : lejlighed.aconto + " kr"}
                          </Text>
                          </Flex>
                          <Text color='black' textAlign="center">Aconto</Text> {/* Centered text */}
                      </Flex>
                      <Flex align="center" flexDirection="column"> {/* Flex container to align items vertically */}
                          <Flex align="center"> {/* Flex container to align items horizontally */}
                          <IoPricetagOutline color='black'/>
                          <Text whiteSpace="pre-line" ml={2} color={lejlighed.status ? "white" : 'black'}>
                            {lejlighed.status ? "XXXX" : lejlighed.mnedlig_leje + " kr"}
                          </Text>
                          </Flex>
                          <Text color='black' textAlign="center">Pris</Text> {/* Centered text */}
                      </Flex>
                  </Wrap>
                  <Heading size ='lg' mt={4}>Beskrivelse</Heading>
                  <Text mt={4}>{lejlighed.beskrivelse}</Text>
                  <Heading size ='lg' mt={4}>Kort</Heading>
                  <AspectRatio ratio={16 / 9} mt={4} mb={4}>
                  <iframe src={`https://www.google.com/maps?q=${encodedLatitude},${encodedLongitude}&z=15&output=embed`}></iframe>
                  </AspectRatio>
                  </ModalBody>

              </ModalContent>
          </Modal>
      </Card>
  );
}

export default AppartmentCard;