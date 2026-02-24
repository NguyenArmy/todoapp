import React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { options } from '@/lib/data'

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const selectedLabel = options.find((item) => item.value === value)?.label

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-52 justify-between"
                >
                    {selectedLabel || "Chọn thời gian"}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-0">
                <Command>
                    <CommandInput placeholder="Tìm thời gian..." />
                    <CommandList>
                        <CommandEmpty>Không tìm thấy.</CommandEmpty>
                        <CommandGroup>
                            {options.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 size-4",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default DateTimeFilter
