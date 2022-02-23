import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Props } from 'react-select'

interface SelectProps {
    options: any[],
    clear?: boolean,
    muti?: boolean,
    loading?: boolean,
    defaultValue?: any[]
}

const Select = dynamic<Props>(() => import('react-select').then((mod) => mod.default), { ssr: false })

const SingleSelect = (props: SelectProps) => {
    const { options, defaultValue, clear, muti, loading } = props
    function setData() {
        return options.map(e => ({ value: e.name, lable: e.name }))
    }

    return (
        <Select
            isClearable={clear}
            isLoading={loading}
            defaultValue={defaultValue}
            isMulti={muti}
            options={setData()}
        />
    );
}

export default SingleSelect;