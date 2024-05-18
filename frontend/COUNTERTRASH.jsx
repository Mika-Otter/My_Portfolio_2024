const CounterNumber = forwardRef(({ number }, ref) => {
    return (
        <div className={s.num} ref={ref}>
            {number}
        </div>
    );
});

const Counter = ({ initialNumber, duration, delay, numbers }) => {
    const counterRef = useRef();
    const numRefs = useRef([]);
    const [counterNumbers, setCounterNumbers] = useState(numbers);

    useEffect(() => {
        const numHeight = numRefs.current[0]?.clientHeight;
        const totalDistance = (counterNumbers.length - 1) * numHeight;

        gsap.to(counterRef.current, {
            y: -totalDistance,
            duration: duration,
            delay: delay,
            ease: "power2.inOut",
        });
    }, []);

    return (
        <div className={s.counter} ref={counterRef}>
            {counterNumbers.map((number, index) => (
                <CounterNumber
                    key={index}
                    number={number}
                    ref={(el) => (numRefs.current[index] = el)}
                />
            ))}
        </div>
    );
};

            <Counter initialNumber={0} duration={1} delay={4} numbers={counterOne} />
                        <Counter initialNumber={0} duration={6} delay={0} numbers={counterTwo} />
                        <Counter initialNumber={1} duration={2} delay={3} numbers={counterThree} />