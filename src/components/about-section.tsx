
export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About WearView</h2>
            <p className="text-muted-foreground mb-4">
              WearView is revolutionizing online shopping with our state-of-the-art virtual try-on technology. 
              We believe that shopping should be an immersive and confident experience, even when done from the comfort of your home.
            </p>
            <p className="text-muted-foreground mb-4">
              Founded in 2023, our team of fashion tech experts and AI specialists have developed a platform that bridges the gap between 
              physical and digital retail experiences. Our mission is to reduce returns, enhance customer satisfaction, and make online 
              shopping more sustainable.
            </p>
            <p className="text-muted-foreground">
              With WearView, you can see exactly how clothes, accessories, and eyewear look on you before making a purchase decision. 
              Our advanced AI algorithms ensure accurate representation of size, fit, and style, giving you the confidence to buy online.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 blur-3xl rounded-xl"></div>
            <div className="relative glass-panel p-6">
              <h3 className="text-xl font-semibold mb-4">Why Choose WearView?</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Accurate virtual try-on using AR technology</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Works with all types of clothing and accessories</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Personalized size recommendations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Reduces returns by 78%</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Environmentally friendly shopping solution</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Secure and private - your data stays yours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
