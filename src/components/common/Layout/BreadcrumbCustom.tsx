import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { BsHouse } from 'react-icons/bs';
import NextLink from 'next/link'

const _defaultGetTextGenerator = (param: String, query: ParsedUrlQuery) => null;
const _defaultGetDefaultTextGenerator = (path: String) => path;

// Pulled out the path part breakdown because its
// going to be used by both `asPath` and `pathname`
const generatePathParts = (pathStr: any) => {
    const pathWithoutQuery = pathStr.split("?")[0];
    return pathWithoutQuery.split("/").filter((v: []) => v.length > 0);
}

export default function BreadcrumbCustom({ getTextGenerator = _defaultGetTextGenerator, getDefaultTextGenerator = _defaultGetDefaultTextGenerator }) {
    const router = useRouter();

    const breadcrumbs = React.useMemo(function generateBreadcrumbs() {
        const asPathNestedRoutes = generatePathParts(router.asPath);
        const pathnameNestedRoutes = generatePathParts(router.pathname);

        const crumblist = asPathNestedRoutes.map((subpath: String, idx: number) => {
            const param = pathnameNestedRoutes[idx].replace("[", "").replace("]", "");

            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            return { href, textGenerator: getTextGenerator(param, router.query), text: getDefaultTextGenerator(subpath) };
        })

        return [...crumblist];
    }, [router.asPath, router.pathname, router.query, getTextGenerator, getDefaultTextGenerator]);

    return (
        <Breadcrumb>
            <BreadcrumbItem key={100}>
                <NextLink href='/'>
                    <BreadcrumbLink ><Icon as={BsHouse} /></BreadcrumbLink>
                </NextLink>

            </BreadcrumbItem>
            {breadcrumbs.map((crumb, idx) => (
                <BreadcrumbItem key={idx} isCurrentPage={idx === breadcrumbs.length - 1}>
                    <NextLink href={crumb.href}>
                        <BreadcrumbLink href={crumb.href}>{crumb.text}</BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}