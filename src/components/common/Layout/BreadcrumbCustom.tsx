import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import { BsHouse } from 'react-icons/bs';
import NextLink from 'next/link'

const _defaultGetTextGenerator = (param: string, query: ParsedUrlQuery) => null;
const _defaultGetDefaultTextGenerator = (path: string) => path;

const generatePathParts = (pathStr: any) => {
    const pathWithoutQuery = pathStr.split("?")[0];
    return pathWithoutQuery.split("/").filter((v: []) => v.length > 0);
}

export default function BreadcrumbCustom({
    getTextGenerator = _defaultGetTextGenerator,
    getDefaultTextGenerator = _defaultGetDefaultTextGenerator
}) {
    const router = useRouter();

    const breadcrumbs = React.useMemo(function generateBreadcrumbs() {
        const asPathNestedRoutes = generatePathParts(router.asPath);
        const pathnameNestedRoutes = generatePathParts(router.pathname);

        const crumblist = asPathNestedRoutes.map((subpath: string, idx: number) => {
            const param = pathnameNestedRoutes[idx].replace("[", "").replace("]", "");

            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            return {
                href,
                textGenerator: getTextGenerator(param, router.query),
                text: getDefaultTextGenerator(subpath)
            };
        })

        return [...crumblist];
    }, [router.asPath, router.pathname, router.query, getTextGenerator, getDefaultTextGenerator]);

    if (router.asPath == '/') return <></>
    
    return (
        <Breadcrumb pt='6'>
            <BreadcrumbItem>
                <NextLink href='/'>
                    <BreadcrumbLink ><Icon as={BsHouse} /></BreadcrumbLink>
                </NextLink>

            </BreadcrumbItem>
            {breadcrumbs.map((crumb, idx) => (
                <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
            ))}
        </Breadcrumb>
    );
}

function Crumb({ text: defaultText, textGenerator, href, last = false }: { text: string, textGenerator: any, href: string, last: boolean }) {

    const [text, setText] = React.useState(defaultText);

    useEffect(() => {
        if (!Boolean(textGenerator)) { return; }
        const finalText = textGenerator;
        setText(finalText);
    }, [textGenerator]);

    if (last) {
        return (<BreadcrumbItem isCurrentPage={true}>
            <NextLink href={href}>
                <BreadcrumbLink>{text}</BreadcrumbLink>
            </NextLink>
        </BreadcrumbItem>)
    }

    return (
        <BreadcrumbItem >
            <NextLink href={href}>
                <BreadcrumbLink>{text}</BreadcrumbLink>
            </NextLink>
        </BreadcrumbItem>
    );
}