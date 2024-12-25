import React from "react";
import { SocialIcon } from "react-social-icons/component";

function Footer() {
  return (
    <div className="dark:bg-[#111827]">
      <div className="border-t rounded-3xl overflow-hidden dark:bg-[#111827] dark:border-gray-700 border-black pb-2">
        <footer className="flex flex-col items-center gap-4 dark:bg-[#ffffff01]">
          <h3 className="font-bold mt-5 dark:text-white">Contact Me</h3>
          <a
            className="dark:text-gray-300 text-gray-500 hover:scale-[1.1] duration-[0.2s]  "
            href="mailto:arshitkumar222@gmail.com"
          >
            arshitkumar222@gmail.com
          </a>
          <div className=" scale-75 flex gap-8">
            <a href="https://www.x.com/arshitkk">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 72 72"
                fill="grey"
                className="hover:scale-[1.4]  duration-[0.2s]"
              >
                <path
                  d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z"
                  className="dark:fill-white"
                />
              </svg>
            </a>
            <a href="https://www.instagram.com/arshitkk/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 71 72"
                fill="none"
                className="hover:scale-[1.4] duration-[0.2s]"
              >
                <path
                  d="M27.3762 35.7808C27.3762 31.1786 31.1083 27.4468 35.7132 27.4468C40.3182 27.4468 44.0522 31.1786 44.0522 35.7808C44.0522 40.383 40.3182 44.1148 35.7132 44.1148C31.1083 44.1148 27.3762 40.383 27.3762 35.7808ZM22.8683 35.7808C22.8683 42.8708 28.619 48.618 35.7132 48.618C42.8075 48.618 48.5581 42.8708 48.5581 35.7808C48.5581 28.6908 42.8075 22.9436 35.7132 22.9436C28.619 22.9436 22.8683 28.6908 22.8683 35.7808ZM46.0648 22.4346C46.0646 23.0279 46.2404 23.608 46.5701 24.1015C46.8997 24.595 47.3684 24.9797 47.9168 25.2069C48.4652 25.4342 49.0688 25.4939 49.6511 25.3784C50.2334 25.2628 50.7684 24.9773 51.1884 24.5579C51.6084 24.1385 51.8945 23.6041 52.0105 23.0222C52.1266 22.4403 52.0674 21.8371 51.8404 21.2888C51.6134 20.7406 51.2289 20.2719 50.7354 19.942C50.2418 19.6122 49.6615 19.436 49.0679 19.4358H49.0667C48.2708 19.4361 47.5077 19.7522 46.9449 20.3144C46.3821 20.8767 46.0655 21.6392 46.0648 22.4346ZM25.6072 56.1302C23.1683 56.0192 21.8427 55.6132 20.9618 55.2702C19.7939 54.8158 18.9606 54.2746 18.0845 53.4002C17.2083 52.5258 16.666 51.6938 16.2133 50.5266C15.8699 49.6466 15.4637 48.3214 15.3528 45.884C15.2316 43.2488 15.2073 42.4572 15.2073 35.781C15.2073 29.1048 15.2336 28.3154 15.3528 25.678C15.4639 23.2406 15.8731 21.918 16.2133 21.0354C16.668 19.8682 17.2095 19.0354 18.0845 18.1598C18.9594 17.2842 19.7919 16.7422 20.9618 16.2898C21.8423 15.9466 23.1683 15.5406 25.6072 15.4298C28.244 15.3086 29.036 15.2844 35.7132 15.2844C42.3904 15.2844 43.1833 15.3106 45.8223 15.4298C48.2612 15.5408 49.5846 15.9498 50.4677 16.2898C51.6356 16.7422 52.4689 17.2854 53.345 18.1598C54.2211 19.0342 54.7615 19.8682 55.2161 21.0354C55.5595 21.9154 55.9658 23.2406 56.0767 25.678C56.1979 28.3154 56.2221 29.1048 56.2221 35.781C56.2221 42.4572 56.1979 43.2466 56.0767 45.884C55.9656 48.3214 55.5573 49.6462 55.2161 50.5266C54.7615 51.6938 54.2199 52.5266 53.345 53.4002C52.4701 54.2738 51.6356 54.8158 50.4677 55.2702C49.5872 55.6134 48.2612 56.0194 45.8223 56.1302C43.1855 56.2514 42.3934 56.2756 35.7132 56.2756C29.033 56.2756 28.2432 56.2514 25.6072 56.1302ZM25.4001 10.9322C22.7371 11.0534 20.9174 11.4754 19.3282 12.0934C17.6824 12.7316 16.2892 13.5878 14.897 14.977C13.5047 16.3662 12.6502 17.7608 12.0116 19.4056C11.3933 20.9948 10.971 22.8124 10.8497 25.4738C10.7265 28.1394 10.6982 28.9916 10.6982 35.7808C10.6982 42.57 10.7265 43.4222 10.8497 46.0878C10.971 48.7494 11.3933 50.5668 12.0116 52.156C12.6502 53.7998 13.5049 55.196 14.897 56.5846C16.289 57.9732 17.6824 58.8282 19.3282 59.4682C20.9204 60.0862 22.7371 60.5082 25.4001 60.6294C28.0687 60.7506 28.92 60.7808 35.7132 60.7808C42.5065 60.7808 43.3592 60.7526 46.0264 60.6294C48.6896 60.5082 50.5081 60.0862 52.0983 59.4682C53.7431 58.8282 55.1373 57.9738 56.5295 56.5846C57.9218 55.1954 58.7745 53.7998 59.4149 52.156C60.0332 50.5668 60.4575 48.7492 60.5768 46.0878C60.698 43.4202 60.7262 42.57 60.7262 35.7808C60.7262 28.9916 60.698 28.1394 60.5768 25.4738C60.4555 22.8122 60.0332 20.9938 59.4149 19.4056C58.7745 17.7618 57.9196 16.3684 56.5295 14.977C55.1395 13.5856 53.7431 12.7316 52.1003 12.0934C50.5081 11.4754 48.6894 11.0514 46.0284 10.9322C43.3612 10.811 42.5085 10.7808 35.7152 10.7808C28.922 10.7808 28.0687 10.809 25.4001 10.9322Z"
                  fill="grey"
                  className="dark:fill-white"
                />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/arshitkk/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 72 72"
                fill="none"
                className="hover:scale-[1.4] duration-[0.2s]"
              >
                <path
                  d="M24.7612 55.999V28.3354H15.5433V55.999H24.7621H24.7612ZM20.1542 24.5591C23.3679 24.5591 25.3687 22.4348 25.3687 19.7801C25.3086 17.065 23.3679 15 20.2153 15C17.0605 15 15 17.065 15 19.7799C15 22.4346 17.0001 24.5588 20.0938 24.5588H20.1534L20.1542 24.5591ZM29.8633 55.999H39.0805V40.5521C39.0805 39.7264 39.1406 38.8985 39.3841 38.3088C40.0502 36.6562 41.5668 34.9455 44.1138 34.9455C47.4484 34.9455 48.7831 37.4821 48.7831 41.2014V55.999H58V40.1376C58 31.6408 53.4532 27.6869 47.3887 27.6869C42.4167 27.6869 40.233 30.4589 39.0198 32.347H39.0812V28.3364H29.8638C29.9841 30.9316 29.8631 56 29.8631 56L29.8633 55.999Z"
                  fill="grey"
                  className="dark:fill-white"
                />
              </svg>
            </a>
            <a href="https://github.com/arshitkk">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="hover:scale-[1.4] duration-[0.2s]"
              >
                <path
                  d="M12 .5C5.648.5.5 5.648.5 12c0 5.1 3.292 9.417 7.87 10.946.575.106.787-.25.787-.557 0-.276-.01-1.012-.016-1.986-3.201.696-3.877-1.544-3.877-1.544-.523-1.328-1.277-1.682-1.277-1.682-1.043-.714.08-.7.08-.7 1.152.082 1.758 1.183 1.758 1.183 1.025 1.756 2.692 1.249 3.35.955.104-.742.402-1.25.731-1.537-2.556-.291-5.245-1.278-5.245-5.689 0-1.257.449-2.285 1.183-3.092-.118-.291-.512-1.463.113-3.05 0 0 .964-.308 3.16 1.18A11.035 11.035 0 0 1 12 5.964c.975.005 1.957.132 2.875.387 2.195-1.488 3.157-1.18 3.157-1.18.628 1.587.234 2.759.116 3.05.737.807 1.182 1.835 1.182 3.092 0 4.42-2.693 5.394-5.259 5.681.414.359.782 1.071.782 2.157 0 1.557-.014 2.812-.014 3.194 0 .31.21.668.794.553C20.707 21.413 24 17.096 24 12c0-6.352-5.148-11.5-11.5-11.5Z"
                  fill="grey"
                  className="dark:fill-white"
                />
              </svg>
            </a>
          </div>
          <span className="mt-3 flex text-[0.9rem] gap-2">
            <p className="text-gray-500 dark:text-gray-300">Created by </p>
            <a
              className="font-bold ark:text-white dark:text-white"
              href="https://www.linkedin.com/in/arshitkk/"
            >
              Arshit Kumar
            </a>
          </span>
          <p className="text-gray-500 ">© 2024 All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
