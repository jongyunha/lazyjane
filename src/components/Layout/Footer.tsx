import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">LazyJane</h3>
            <p className="footer-description">
              세련되고 트렌디한 패션으로 당신만의 스타일을 완성하세요.
            </p>
            <div className="social-links">
              <a href="https://instagram.com/y_jane13" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="mailto:hello@lazyjane.com" className="social-link" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links-grid">
            <div className="footer-section">
              <h4 className="footer-section-title">회사 정보</h4>
              <ul className="footer-links">
                <li><a href="/about" className="footer-link">회사 소개</a></li>
                <li><a href="/careers" className="footer-link">채용</a></li>
                <li><a href="/press" className="footer-link">보도자료</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">고객 서비스</h4>
              <ul className="footer-links">
                <li><a href="/contact" className="footer-link">문의하기</a></li>
                <li><a href="/faq" className="footer-link">자주 묻는 질문</a></li>
                <li><a href="/returns" className="footer-link">반품/교환</a></li>
                <li><a href="/shipping" className="footer-link">배송 정보</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">약관</h4>
              <ul className="footer-links">
                <li><a href="/privacy" className="footer-link">개인정보처리방침</a></li>
                <li><a href="/terms" className="footer-link">이용약관</a></li>
                <li><a href="/cookies" className="footer-link">쿠키 정책</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">뉴스레터</h4>
              <p className="newsletter-text">
                최신 컬렉션과 특별 혜택을 가장 먼저 받아보세요.
              </p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="newsletter-input"
                  aria-label="이메일 주소"
                />
                <button className="newsletter-button" type="submit">
                  구독
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 LazyJane. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <span className="footer-bottom-text">
              Made with ❤️ for Korean fashion lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};