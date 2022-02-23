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
    const [values, setValues] = useState<any[]>([])
    useEffect(() => {
        function setData() {
            const clone: any[] = []
            options.map(e => {
                clone.push([...clone,{ value: e.name, lable: e.name }])
            })
            
            setValues(clone)
        }
        setData()
    }, [])
    
    return (
        <Select
            isClearable={clear}
            isLoading={loading}
            defaultValue={defaultValue}
            isMulti={muti}
            options={values}
        />
    );
}

export default SingleSelect;