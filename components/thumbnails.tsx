// ./componenets/thumbnails.tsx
'use client'

import React, { useState } from 'react';
import { Lejlighed } from '../queries/lejlighed';
import AppartmentCard from './AppartmentCard';
import { SimpleGrid, Select, VStack, HStack, Wrap,Switch, FormControl, FormLabel } from '@chakra-ui/react';

interface ThumbnailsProps {
    lejligheder: Lejlighed[];
}

const Thumbnails: React.FC<ThumbnailsProps> = ({ lejligheder }) => {
    const [selectedVærelser, setSelectedVærelser] = useState<string | null>(null);
    const [ledig, setLedig] = useState<boolean>(false);
    console.log(lejligheder)

    // Handler for select change
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedVærelser(value);
    };

    // Handler for switch change
    const handleSwitchChange = () => {
        setLedig(prev => !prev);
    };

    return (
        <div>
            <VStack>
                <HStack align={'center'}>
                <FormControl display='contents' alignItems='center'>
                    <FormLabel mb={2}>Værelser</FormLabel>
                        <Select name="værelser" placeholder="Alle" onChange={handleSelectChange} mb={2}>tes
                            {Array.from(new Set(lejligheder.map(lejlighed => lejlighed.vrelser))).map(værelser => (
                                <option key={værelser} value={værelser}>
                                    {værelser}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='ledig' mb={2}>Vis kun ledige</FormLabel>
                        <Switch mb={2} id='ledig' isChecked={ledig} onChange={handleSwitchChange}/>
                    </FormControl>
                </HStack>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                    {lejligheder
                        .filter(lejlighed => (!selectedVærelser || lejlighed.vrelser === selectedVærelser) && (!ledig || lejlighed.status !== ledig))
                        .map(lejlighed => (
                            <AppartmentCard key={lejlighed._id} lejlighed={lejlighed} />
                    ))} 
                </SimpleGrid>
            </VStack>
        </div>
    );
};

export default Thumbnails;

