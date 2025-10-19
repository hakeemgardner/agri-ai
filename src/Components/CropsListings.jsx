
function CropListings(props) {
    return (
    <div className="bg-background-light rounded-xl overflow-hidden border border-border-light shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="w-full h-48 bg-cover bg-center" style={{ backgroundImage: `url(${props.image})` }} >

        </div>
        <div className="p-6">
            <h4 className="text-2xl font-bold text-content-light dark:text-content-dark">{props.title}</h4>
            <p className="text-lg text-content-light/80 mt-1">{props.price}</p>
            <button
            className="mt-6 w-full h-14 bg-green-400 text-content-dark text-lg font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            onClick={() => props.onContactClick(props.farmer)}
            >
                Contact Farmer
            </button>
        </div>
    </div>
);
}

export default CropListings;