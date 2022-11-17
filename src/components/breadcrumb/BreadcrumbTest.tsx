type BreadcrumbTestProps = {
    crumbs: string[];
    selected: (crumb: string) => void;
};

function BreadcrumbTest(props: BreadcrumbTestProps) {
    const crumbs: string[] = props.crumbs;
    const isLast = (index: number) => {
        return index === crumbs.length - 1;
    };
    return (
        <>
            <ol className='bg-white border boder-black rounded flex justify-center items-center mt-1'>
                {crumbs.map((crumb: string, index: number) => {
                    const disabled = isLast(index) ? 'opacity-50 cursor-not-allowed' : '';
                    return (
                        <li key={index} className='items-center '>
                            <button
                                className={`rounded mx-2 ${disabled}`}
                                onClick={() => props.selected(crumb)}
                            >
                                {crumb}
                            </button>
                            {isLast(index) ? <span></span> : <span>/</span>}
                        </li>
                    );
                })}
            </ol>
        </>
    );
}

export default BreadcrumbTest;
