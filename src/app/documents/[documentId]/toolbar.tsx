"use client";

import { cn } from '@/lib/utils';
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SmileIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Level } from '@tiptap/extension-heading';
import { ColorResult, CirclePicker } from 'react-color';

const TextColorButton = () => {
    const {editor} = useEditorStore();
    
    const value = editor?.getAttributes("textStyle").color || "#000000";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    };

    const allColors = [
        "#000000", "#808080", "#FFFFFF", "#795548", "#ff5722", "#f44336", "#e91e63", "#9c27b0", 
        "#4B0082", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#40E0D0", 
        "#4caf50", "#8bc34a", "#808000", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#607d8b", 
      ];
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button 
                    className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
                    title='Heading'
                >
                    <span className='text-xs' style={{ color : value}}>A</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor : value}}></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1.5 z-[100] bg-white/60 shadow-md border border-gray-300 rounded-md backdrop-blur-md'>
                <CirclePicker color={value} onChange={onChange} colors={ allColors }/>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const HeadingButton = () => {
    const {editor} = useEditorStore();
    const headings = [
        { label: 'Normal Text', value: 0, fontSize: '16px' },
        { label: 'Heading 1', value: 1, fontSize: '32px' },
        { label: 'Heading 2', value: 2, fontSize: '24px' },
        { label: 'Heading 3', value: 3, fontSize: '20px' },
        { label: 'Heading 4', value: 4, fontSize: '18px' },
        { label: 'Heading 5', value: 5, fontSize: '16px' },
    ];

    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive(`heading`, { level })) {
                return `Heading ${level}`;
            }
        }
        return 'Normal Text';
    };

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button 
                className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
                title='Heading'
            >
                <span className='truncate'>
                    {getCurrentHeading()}
                </span>
                <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-1 flex flex-col gap-y-1 z-[100] max-h-60 overflow-y-auto bg-white/60 shadow-md border border-gray-300 rounded-md backdrop-blur-md'>
            {headings.map(({label, value, fontSize}) => (
                <DropdownMenuItem
                    key={value}
                    className={cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80', 
                        ((value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', {level : value})) && 'bg-neutral-200/80')}
                    style={{ fontSize }}
                    onClick={() => 
                        {if (value ===0) {
                            editor?.chain().focus().setParagraph().run();
                        } else {
                            editor?.chain().focus().toggleHeading({level: value as Level}).run();
                        }}
                    }
                >
                    {label}     
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
    );
};

const FontFamilyButton = () => {
    const {editor} = useEditorStore();
    const fonts = [
        {label: 'Arial', value: 'Arial'},
        {label: 'Arial Black', value: 'Arial Black'},
        {label: 'Arial Narrow', value: 'Arial Narrow'},
        {label: 'Book Antiqua', value: 'Book Antiqua'},
        {label: 'Bookman Old Style', value: 'Bookman Old Style'},
        {label: 'Century Gothic', value: 'Century Gothic'},
        {label: 'Comic Sans MS', value: 'Comic Sans MS'},
        {label: 'Copperplate Gothic Bold', value: 'Copperplate Gothic Bold'},
        {label: 'Copperplate Gothic Light', value: 'Copperplate Gothic Light'},
        {label: 'Courier New', value: 'Courier New'},
        {label: 'Franklin Gothic Medium', value: 'Franklin Gothic Medium'},
        {label: 'Garamond', value: 'Garamond'},
        {label: 'Geneva', value: 'Geneva'},
        {label: 'Georgia', value: 'Georgia'},
        {label: 'Helvetica', value: 'Helvetica'},
        {label: 'Impact', value: 'Impact'},
        {label: 'Lucida Console', value: 'Lucida Console'},
        {label: 'Lucida Sans Unicode', value: 'Lucida Sans Unicode'},
        {label: 'MonoSpace', value: 'MonoSpace'},
        {label: 'Palatino Linotype', value: 'Palatino Linotype'},
        {label: 'Tahoma', value: 'Tahoma'},
        {label: 'Times New Roman', value: 'Times New Roman'},
        {label: 'Trebuchet MS', value: 'Trebuchet MS'},
        {label: 'Verdana', value: 'Verdana'},
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button 
                    className='h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
                    title='Font Family'
                >
                    <span className='truncate'>
                        {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1 z-[100] max-h-60 overflow-y-auto bg-white/60 shadow-md border border-gray-300 rounded-md backdrop-blur-md'>
                {fonts.map(({label,value}) => (
                    <DropdownMenuItem
                        key={value}
                        className={cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80', editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80')}
                        style={{fontFamily: value}}
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                    >
                        <span className='truncate text-sm'>
                            {label}
                            </span>
                            
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const emojis = [
    "😂", "❤️", "🤣", "😍", "🙏", "😭", "😊", "🥰", "👍", "😁", 
    "🔥", "😢", "🙌", "🤔", "😎", "🥹", "😃", "🎉", "👏", "💯", 
    "🎶", "✨", "😆", "😜", "😉", "😅", "🥺", "💔", "😏", "💖", 
    "😡", "🤩", "🤗", "🌎️", "🤦‍♂️", "🙈", "💛", "😇", "😋", "😌", 
    "💪", "👀", "😤", "😝", "🤷‍♂️", "👑", "🙃", "🥳", "😔", "🤤", 
    "😴", "🤯", "😳", "🤞", "🤙", "💚", "💗", "😑", "🎊", "🤧", 
    "😪", "👊", "🤑", "🤡", "👻", "💀", "😈", "☠️", "🥵", "🥶", 
    "🧐", "😠", "🤨", "🤭", "🤫", "💤", "🎁", "💃", "🕺", "👽", 
    "🐶", "🐱", "🐼", "🦄", "🍕", "🍔", "🍟", "🌮", "🌭", "🍣", 
    "🍪", "🍩", "🍫", "🥤", "☕", "🍷", "🍺", "🏀", "⚽", "🎸", 
    "🎮", "🚗", "✈️", "⏳", "🔑", "📷", "📞", "📱", "💻", "🖥️", 
    "⌚", "🎧", "📚", "📝", "🔒", "🔓", "🚀", "💎", "💡", "🔔"
  ];

const EmojiPicker = () => {
    const { editor } = useEditorStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button 
                    className='h-7 w-10 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'
                    title='Emoji Picker'
                >
                    <SmileIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2 bg-white/60 shadow-md border border-gray-300 rounded-md backdrop-blur-md z-[100] max-h-60 overflow-y-auto'>
                <div className="grid grid-cols-5 gap-1">
                    {emojis.map((emoji) => (
                        <DropdownMenuItem
                            key={emoji}
                            className="p-1 text-lg hover:bg-neutral-200/80 flex items-center justify-center"
                            onClick={() => editor?.chain().focus().insertContent(emoji).run()}
                        >
                            {emoji}
                        </DropdownMenuItem>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

interface ToolbarButtonProps {
    onClick?:  () => void;
    isActive?: boolean;
    icon:      LucideIcon;
    label:     string;
};

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
    label,
}: ToolbarButtonProps) => {
    return (
        <button 
            onClick={onClick}
            title= {label}

            // cn method from shadcn: include default classes and conditionally add more
            className={cn('text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neural-200/80', isActive && 'bg-neutral-200/80'
            )}
        >
            <Icon className='size-4'/>
        </button>
    );
};

export const Toolbar = () => {
    const {editor} = useEditorStore();
    console.log('Toolbar editor: ', {editor});

    const sections: {
        label:     string; 
        icon:      LucideIcon; 
        onClick:   () => void;
        isActive?: boolean;
    }[][] = [
        [
            {
                label: 'Undo',
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: 'Redo',
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: 'Print',
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: 'Spell Check',
                icon: SpellCheckIcon,
                isActive: editor?.view.dom.getAttribute('spellcheck') === 'true',
                onClick: () => {
                    const current = editor?.view.dom.getAttribute('spellcheck');
                    editor?.view.dom.setAttribute('spellcheck', current === 'true' ? 'false' : 'true');
                },
            }
        ],
        [   {
                label: 'Bold',
                icon: BoldIcon,
                isActive: editor?.isActive('bold'),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: 'Italic',
                icon: ItalicIcon,
                isActive: editor?.isActive('italic'),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: 'Underline',
                icon: UnderlineIcon,
                isActive: editor?.isActive('underline'),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: 'Comment',
                icon: MessageSquarePlusIcon,
                onClick: () => console.log('TODO: Comment'),
                isActive: false, //TODO
            },
            {
                label: 'Todo List',
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive('taskList'),
            },
            {
                label: 'Remove Formatting',
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },
        ],
    ];

    return ( 
        <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
            
            <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
            <FontFamilyButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
            <HeadingButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
            {/* TODO: Font Size */}
            <Separator orientation='vertical' className='h-6 bg-neutral-300'/>

            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}

            <TextColorButton />
            {/* TODO: Highlight Color */}

            <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
            <EmojiPicker />
            {/* TODO: Link */}
            {/* TODO: Image */}
            {/* TODO: Align */}
            {/* TODO: Line Height */}
            {/* TODO: List */}

            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}

        </div> 
    );
};