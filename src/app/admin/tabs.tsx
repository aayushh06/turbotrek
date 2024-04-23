import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

export default function TabItems({
  items,
}: {
  items: [React.ReactNode, string][];
}) {
  return (
    <Tabs defaultValue={
      items[1][1]
    } className='p-4'>
      <TabsList className="grid w-full grid-cols-4"
      >
        {items.map(([_, name]) => (
          <TabsTrigger key={name} value={name} className='capitalize'>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map(([content, name]) => (
        <TabsContent key={name} value={name}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
