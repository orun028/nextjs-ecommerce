import { Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'

const CustomLink = (rest: LinkProps, href: string, children: any) => {
    return (
        <NextLink href={href}>
            <Link {...rest}>{children}</Link>
        </NextLink>
    )
}

export default CustomLink;