interface HeadingType {
    title: string,
    title2: string,
    subtitle: string
}

export default function Heading({title, subtitle, title2}:HeadingType) {
    return (
        <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{title} <span className="text-primary-600">{title2}</span> </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
            </p>
        </div>
    )
}
