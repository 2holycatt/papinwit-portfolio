import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingIndicatorProps {
    isLoading: boolean;
    size?: number; // เพิ่ม prop 'size' และทำให้เป็น optional
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading, size = 50 }) => { // กำหนดค่า default ให้ size = 50px
    const circleRef = useRef<SVGCircleElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const initialColor = '#4B5563';
    const primaryColor = '#3B82F6';
    const secondaryColor = '#6B7280';

    useEffect(() => {
        if (isLoading && circleRef.current && containerRef.current) {
            const circle = circleRef.current;
            const container = containerRef.current;

            gsap.timeline({ repeat: -1, yoyo: false })
                .to(circle, {
                    duration: 1.5,
                    rotation: 360,
                    transformOrigin: 'center center',
                    ease: 'linear',
                });

            gsap.timeline({ repeat: -1, yoyo: true })
                .to(circle, {
                    duration: 1,
                    fill: primaryColor,
                    ease: 'power2.inOut',
                }, 0)
                .to(circle, {
                    duration: 1,
                    fill: secondaryColor,
                    ease: 'power2.inOut',
                }, 1);

            gsap.to(container, {
                scale: 1.1,
                duration: 0.75,
                yoyo: true,
                repeat: -1,
                ease: 'power1.inOut',
            });

        } else {
            gsap.killTweensOf([circleRef.current, containerRef.current]);
            if (circleRef.current) {
                gsap.set(circleRef.current, { rotation: 0, fill: initialColor });
            }
            if (containerRef.current) {
                gsap.set(containerRef.current, { scale: 1 });
            }
        }
    }, [isLoading, initialColor, primaryColor, secondaryColor]);

    return (
        <>
            {isLoading && (
                <div
                    ref={containerRef}
                    // ปรับ Tailwind classes ให้ใช้ค่า size จาก prop
                    className={`flex justify-center items-center w-[${size}px] h-[${size}px]`}
                >
                    {/* SVG's width และ height ก็ใช้ค่า size จาก prop */}
                    <svg width={size} height={size} viewBox="0 0 50 50"> {/* viewBox ยังคงเดิมเพื่อให้ content scale ตาม */}
                        <circle
                            ref={circleRef}
                            cx="25" // ค่าเหล่านี้จะ scale ตาม viewBox
                            cy="25"
                            r="20"
                            strokeWidth="4"
                            className="stroke-gray-600 fill-gray-600"
                            strokeDasharray="62.83 31.415"
                        />
                    </svg>
                </div>
            )}
        </>
    );
};

export default LoadingIndicator;