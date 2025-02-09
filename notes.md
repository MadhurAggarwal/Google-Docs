## Installation

## Routing
### DocumentsIDPage
Id Pages require async params that need to be awaited before use in Nextjs 15

### DocumentsLayout
If we dont pass children, all the /documents paths including /documents/123 etc will display the layout page file
<br>
Also, the layout doesnt re-render

## Editor
### TipTap Editor

### Server vs Client Components
Every Component in the App folder is a server component by default, so we can directly fetch databases with it. However, they are static. We cannot use Hooks with them, like useEditor.
So in order to fix this, we need to convert it into a client component, using "use client;"

### ClassName:
print: px-0 means when we print the page we have 0 padding on the document.
in the editor we do px-4 so that we have the page visible as separate from the website bg

## Self Notes
use ctrl+shift+p and "developer: reload window"
<br>
.next folder can be deleted anytime
<br>
read interfaces & props (ToolBox Button)
<br>
read zustand.

it is used for storing what?
<br>
read import "type Editor" in zutand (src->store->use-editor-store.ts)
