'use client'; // Component นี้ต้องเป็น Client Component เพราะมีการโต้ตอบกับผู้ใช้

import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from 'react-resizable-panels';

export default function ResizablePanes() {
    return (
        <PanelGroup direction="horizontal" className="h-screen w-full bg-white">
            {/* หน้าต่างด้านซ้าย */}
            <Panel defaultSize={50} minSize={10}>
                <div className="flex h-full items-center justify-center bg-zinc-100 p-4">
                    <span className="font-medium">Left Panel</span>
                </div>
            </Panel>

            {/* เส้นเขตสำหรับลาก (The Divider) */}
            <PanelResizeHandle className="w-2 bg-zinc-200 hover:bg-blue-500 transition-colors" />

            {/* หน้าต่างด้านขวา */}
            <Panel defaultSize={50} minSize={10}>
                <div className="flex h-full items-center justify-center bg-slate-100 p-4">
                    <span className="font-medium">Right Panel</span>
                </div>
            </Panel>
        </PanelGroup>
    );
}