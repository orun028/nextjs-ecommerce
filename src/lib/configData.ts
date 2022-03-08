interface NavItem {
    label: string;
    ico?: any;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

export const NAV_MENU: Array<NavItem> = [
    {
        label: 'Nón, mũ len',
        href: '#',
    }, {
        label: 'Áo phông, sơ mi',
        href: '#',
        children: [
            {
                label: 'Hoodie',
                subLabel: 'Vải mát không rụng lông',
                href: '#',
            },
            {
                label: 'Áo thun họa tiết',
                subLabel: '100% cotton mềm mượt mát',
                href: '#',
            },
        ],
    }, {
        label: 'Quần kaki, jean',
        href: '#',
    }, {
        label: 'Giày, dép',
        href: '#',
    }, {
        label: 'Phụ kiện',
        href: '#',
    }
];