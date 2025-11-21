

const CardUI = ({children}) => {

    return(
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/40 mb-6">
            {children}
        </div>
    )
}

export default CardUI;