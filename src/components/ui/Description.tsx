import { cn } from "@/lib/utils"
import React from "react"

type DescriptionVariant = "p" | "span" | "div"

interface DescriptionSectionProps {
	variant?: DescriptionVariant
	children?: React.ReactNode
	className?: string
	dangerouslySetInnerHTML?: { __html: string }
	onClick?: () => void;
}

const descriptionStyles: Record<DescriptionVariant, string> = {
	p: "text-sm sm:text-base",
	span: "text-xs sm:text-sm md:text-base",
	div: "text-sm sm:text-xs md:text-base",
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
	variant = "p",
	children,
	className,
	dangerouslySetInnerHTML,
	onClick
}) => {
	const Tag = variant as keyof JSX.IntrinsicElements
	return (
		<Tag
			onClick={onClick}
			dangerouslySetInnerHTML={
				dangerouslySetInnerHTML ? dangerouslySetInnerHTML : undefined
			}
			className={cn(
				`${descriptionStyles[variant]} font-paragraf`,
				className
			)}
		>
			{children}
		</Tag>
	)
}

export default DescriptionSection
