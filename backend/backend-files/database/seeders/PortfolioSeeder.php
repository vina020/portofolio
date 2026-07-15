<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedProfile();
        $this->seedSkills();
        $this->seedExperiences();
        $this->seedProjects();
    }

    private function seedProfile(): void
    {
        Profile::query()->delete();

        Profile::create([
            'name' => 'Vina Nur Aini',
            'tagline' => 'Information Systems Student | Data Analyst | Web Developer',
            'about' => "Hi, my name is Vina Nur Aini, an undergraduate student majoring in Information Systems at Airlangga University. I have a strong interest in Data Visualization, Data Analysis, and Financial Management, focusing on transforming data into actionable insights to support strategic and financial decision-making. I am also interested in system requirements analysis for companies and have experience in designing and developing information systems to support business processes and organizational needs.\n\nBeyond technology, I'm also passionate about the cosmetics and beauty industry, aiming to combine data-driven innovation, creativity, business analysis, and financial insight to build a future career that bridges both technology and business fields.",
            'vision' => 'To become a data-driven and innovative professional who integrates Information Technology, Financial Management, and creative industry insights to create impactful, sustainable, and future-oriented business solutions.',
            'mission' => 'To continuously develop skills in data visualization, data analysis, and financial management, and to apply technology-based innovation in business development, particularly in the cosmetics and beauty industry.',
            'email' => 'vinanurainina@gmail.com',
            'phone' => '+62 858 8788 5197',
            'location' => 'Surabaya, Indonesia',
            'linkedin_url' => 'https://linkedin.com/in/vina-nur-aini',
            'github_url' => 'https://github.com/vina020',
        ]);
    }

    private function seedSkills(): void
    {
        Skill::query()->delete();

        $skills = [
            // Programming Language
            ['name' => 'PHP', 'category' => 'Programming Language'],
            ['name' => 'Python', 'category' => 'Programming Language'],
            ['name' => 'Dart', 'category' => 'Programming Language'],
            ['name' => 'Java', 'category' => 'Programming Language'],
            ['name' => 'R', 'category' => 'Programming Language'],

            // Framework
            ['name' => 'Laravel', 'category' => 'Framework'],
            ['name' => 'React', 'category' => 'Framework'],
            ['name' => 'Flutter', 'category' => 'Framework'],

            // Tools & Software
            ['name' => 'Figma', 'category' => 'Tools & Software'],
            ['name' => 'Tableau', 'category' => 'Tools & Software'],
            ['name' => 'MySQL', 'category' => 'Tools & Software'],
            ['name' => 'Supabase', 'category' => 'Tools & Software'],

            // Focus Area
            ['name' => 'Data Visualization & Analysis', 'category' => 'Focus Area'],
            ['name' => 'Machine Learning', 'category' => 'Focus Area'],
            ['name' => 'Enterprise Architecture (TOGAF)', 'category' => 'Focus Area'],
            ['name' => 'Full-Stack Web Development', 'category' => 'Focus Area'],

            // Core Strength
            ['name' => 'Data Visualization & Analytical Thinking', 'category' => 'Core Strength'],
            ['name' => 'Financial Planning & Sponsorship Management', 'category' => 'Core Strength'],
            ['name' => 'Creative & Business-Oriented Mindset', 'category' => 'Core Strength'],
            ['name' => 'Strong Organizational and Teamwork Skills', 'category' => 'Core Strength'],
            ['name' => 'Attention to Detail and Continuous Learning', 'category' => 'Core Strength'],
        ];

        foreach ($skills as $i => $skill) {
            Skill::create($skill + ['order' => $i]);
        }
    }

    private function seedExperiences(): void
    {
        Experience::query()->delete();

        $experiences = [
            [
                'title' => 'Web Developer Intern',
                'organization' => 'Otak Kanan',
                'type' => 'internship',
                'period' => 'Sedang Berjalan',
                'description' => "Mengembangkan portal manajemen magang berbasis web (EarlyPath) untuk mendukung proses rekrutmen, monitoring, dan administrasi magang secara terintegrasi dengan berbagai role pengguna (Candidate, HR, Mentor, Admin, Superadmin) serta fitur berbasis AI.\nTools: Laravel, PHP, MySQL, Python, REST API, AI Integration, React, Tailwind CSS",
            ],
            [
                'title' => 'Full-Stack Web Developer Intern',
                'organization' => 'PDAM Magetan',
                'type' => 'internship',
                'period' => '2025',
                'description' => "Mengembangkan sistem website perusahaan menggunakan Laravel dan MySQL, mengadaptasi fitur dari website sebelumnya dengan tampilan yang lebih modern, interaktif, dan user-friendly.\nTools: Laravel, PHP, MySQL, Python",
            ],
            [
                'title' => 'General Treasurer',
                'organization' => 'HIMSI (Himpunan Mahasiswa S1 Sistem Informasi)',
                'type' => 'organization',
                'period' => 'Maret 2025 - Februari 2026',
                'description' => 'Bertanggung jawab atas birokrasi dengan dekan fakultas untuk keperluan dana himpunan, membuat rancangan anggaran dana selama 1 tahun kepengurusan, serta mencatat dan mengarsipkan seluruh aspek keuangan organisasi.',
            ],
            [
                'title' => 'Bendahara 2',
                'organization' => 'IMMS (Ikatan Mahasiswa Magetan Surabaya)',
                'type' => 'organization',
                'period' => 'Maret 2024 - Desember 2024',
                'description' => 'Membuat rencana anggaran selama masa kepengurusan, mencatat dan melaporkan setiap aspek keuangan termasuk pembayaran dan pengeluaran, serta melakukan pengarsipan keuangan.',
            ],
            [
                'title' => 'Staff Inventory',
                'organization' => 'Entrepreneurship & Inventory HIMSI',
                'type' => 'organization',
                'period' => 'Maret 2024 - Desember 2024',
                'description' => 'Bertanggung jawab pada program "Officer Development Program" dan agenda "Piket HIMSI" di bidang Entrepreneurship & Inventory.',
            ],
            [
                'title' => 'Coordinator of Sponsorship Division',
                'organization' => 'Pengmas HIMSI 2025',
                'type' => 'volunteer',
                'period' => 'Mei 2025 - Juni 2025',
                'description' => 'Memimpin rekrutmen staff sponsorship, membagi jobdesk, menentukan target sponsor, melakukan negosiasi, dan mengajukan proposal kerja sama sponsorship.',
            ],
            [
                'title' => 'Coordinator of Fundraising Division',
                'organization' => 'SCIFEAST 2024',
                'type' => 'volunteer',
                'period' => 'Mei 2024 - November 2024',
                'description' => 'Menyusun dan menjalankan strategi penggalangan dana sesuai target, serta memimpin tim dalam produksi merchandise dan agenda fundraising lainnya.',
            ],
            [
                'title' => 'Expert Staff of Sponsorship Division',
                'organization' => 'INFEST 2024',
                'type' => 'volunteer',
                'period' => 'Oktober 2024 - Desember 2024',
                'description' => 'Menentukan target sponsor, menghubungi dan menjalin kerja sama dengan sponsor, serta mengajukan proposal kerja sama.',
            ],
            [
                'title' => 'Staff of Sponsorship Division',
                'organization' => 'AIC (Airlangga International Conference) 2024',
                'type' => 'volunteer',
                'period' => 'Oktober 2024 - November 2024',
                'description' => 'Menentukan target sponsor, menjalin kerja sama, mengajukan proposal, dan melakukan negosiasi dengan pihak sponsor.',
            ],
        ];

        foreach ($experiences as $i => $exp) {
            Experience::create($exp + ['order' => $i]);
        }
    }

    private function seedProjects(): void
    {
        Project::query()->delete();

        $projects = [
            [
                'title' => 'EarlyPath - Internship Management Portal',
                'category' => 'Web Programming',
                'summary' => 'AI-powered web portal to manage internship recruitment, monitoring, and administration with role-based dashboards.',
                'description' => "Currently working as a Web Developer Intern at Otak Kanan, contributing to the development of an internship management portal designed to streamline recruitment, monitoring, and internship administration processes. The system supports multiple user roles including Candidate, HR, Mentor, Admin, and Superadmin, each with different access levels and functionalities. The project also integrates AI-powered features to improve efficiency and user experience within the platform.",
                'tools' => ['Laravel', 'PHP', 'MySQL', 'React', 'Tailwind CSS', 'REST API', 'AI Integration'],
                'key_results' => [
                    'Developed a role-based internship portal with separate access and dashboards for Candidate, HR, Mentor, Admin, and Superadmin users.',
                    'Implemented authentication and authorization systems to manage user permissions securely.',
                    'Built responsive and interactive web interfaces to improve usability and navigation flow.',
                    'Integrated AI-based features to support automation and enhance platform functionality.',
                    'Developed dynamic data management features including internship applications, monitoring, evaluation, and reporting systems.',
                ],
                'featured' => true,
                'order' => 0,
            ],
            [
                'title' => 'PDAM Magetan Company Website',
                'category' => 'Web Programming',
                'summary' => 'A full-stack company website rebuild with a modern, responsive, and interactive interface.',
                'description' => 'During my internship at PDAM Magetan, I developed a web-based information system using Laravel and MySQL. The project involved redesigning and rebuilding the existing website system with an improved interface and user experience while maintaining core functionalities similar to the original platform.',
                'tools' => ['Laravel', 'PHP', 'MySQL', 'Python'],
                'key_results' => [
                    'Developed a full-stack web application using Laravel framework and MySQL database integration.',
                    'Redesigned the website interface to be more modern, responsive, and interactive.',
                    'Implemented core features similar to the previous company website system.',
                    'Built CRUD functionality and dynamic data management within the system.',
                    'Improved navigation structure and user experience for ease of use.',
                ],
                'featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'Hydroponic Grow (HIG) Mobile App',
                'category' => 'Mobile Programming',
                'summary' => 'A mobile-based hydroponic planting guide app with task management and plant progress tracking.',
                'description' => 'Hydroponic Grow (HIG) is a mobile application designed to assist users, especially those with limited land, in learning and practicing hydroponic cultivation. The app provides a digital guide for each stage of planting, from preparation to harvest. It combines educational features, task management, and plant monitoring to help users track their plant growth progress efficiently.',
                'tools' => ['Flutter', 'Dart', 'Supabase', 'Supabase PostgreSQL', 'Provider', 'Figma'],
                'key_results' => [
                    'User Authentication System',
                    'Plant Selection & Onboarding',
                    'Daily Task Management',
                    'Accuracy Checking System',
                    'History & Analytics',
                    'Evaluation & Feedback System',
                    'Progress & Timeline Visualization',
                ],
                'featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'Hydroponic Grow Web Platform',
                'category' => 'Web Programming',
                'summary' => 'A companion web platform with tutorials, articles, videos, and a community forum for hydroponic growers.',
                'description' => 'This project develops a web-based platform that supports users in learning hydroponic cultivation through integrated tutorials, educational articles, YouTube video collections, and a community sharing forum. The website is designed to complement the HIG mobile application by providing accessible beginner-friendly hydroponic guides, multimedia learning resources, and a social space for users to exchange experiences. Both user and admin dashboards were implemented to manage content and interactions efficiently.',
                'tools' => ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
                'key_results' => [
                    'Implemented a fully functional multi-page website integrated with mobile-guided hydroponic tutorials.',
                    'Delivered complete user and admin dashboards supporting profile management and content administration.',
                    'Developed article, video, and tutorial management systems enabling CRUD operations for admins.',
                ],
                'featured' => false,
                'order' => 3,
            ],
            [
                'title' => 'Credit Card Fraud Detection',
                'category' => 'Machine Learning',
                'summary' => 'Feature selection and extraction techniques (PCA, T-SNE) for detecting fraudulent credit card transactions.',
                'description' => 'This project focuses on detecting credit card fraud using a dataset obtained from Kaggle. The process includes several machine learning data preprocessing stages such as data cleaning, normalization, imbalance handling, feature selection using Spearman Correlation, and feature extraction using PCA and T-SNE. The goal is to identify significant features influencing fraud detection accuracy and to visualize separability between fraud and non-fraud transactions.',
                'tools' => ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'Imbalanced-learn', 'SMOTE', 'PCA', 'T-SNE'],
                'key_results' => [
                    'Achieved balanced class distribution using SMOTE and Random Undersampling.',
                    'Identified key features (ratio_to_median_purchase_price and online_order) with correlation ≥ 0.1 to the target variable.',
                    'PCA and T-SNE visualizations showed clearer class separation and improved clustering results.',
                ],
                'featured' => true,
                'order' => 4,
            ],
            [
                'title' => 'Real Estate Price Forecasting with SVM',
                'category' => 'Machine Learning',
                'summary' => 'Forecasting local real estate prices using Support Vector Machine compared against traditional time-series models.',
                'description' => 'This study focuses on predicting local real estate prices using Support Vector Machine (SVM). The research compares traditional forecasting models such as Simple Moving Average and ARIMA with the SVM model to assess predictive accuracy. The dataset used includes housing prices, sale dates, number of bedrooms, and locations from 2007 to 2019. The study evaluates performance across various kernel functions (linear, radial, polynomial) and analyzes prediction accuracy through visualization and confusion matrices.',
                'tools' => ['R', 'e1071', 'ggplot2', 'ARIMA', 'Simple Moving Average'],
                'key_results' => [
                    'Achieved prediction accuracies of 63.5% (linear), 67.4% (radial), and 66.0% (polynomial) kernels.',
                    'Identified polynomial kernel as the best-performing model based on visual clarity and accuracy trade-off.',
                    'Concluded that SVM provides moderate accuracy in price prediction and can outperform traditional time-series models when enhanced with richer feature sets.',
                ],
                'featured' => false,
                'order' => 5,
            ],
            [
                'title' => "World's Best Universities Ranking Analysis",
                'category' => 'Data Analysis & Visualization',
                'summary' => 'Visual analysis of the 2023 Times Higher Education World University Rankings using Tableau.',
                'description' => 'This project focuses on analyzing the 2023 Times Higher Education (THE) World University Rankings using Tableau. The analysis includes data preprocessing, geographical visualization, indicator comparison, and correlation exploration to understand global university performance. Multiple dashboards were designed to highlight ranking patterns, indicator strengths, distributions across developed vs developing countries, and international student presence.',
                'tools' => ['Tableau'],
                'key_results' => [
                    'Top universities worldwide are dominated by institutions from the United States and the United Kingdom, led by Oxford, Harvard, and Stanford.',
                    'Developed countries account for over 70% of the top 100 universities globally, showing strong dominance in quality and resources.',
                ],
                'featured' => false,
                'order' => 6,
            ],
            [
                'title' => 'Student Performance Analysis',
                'category' => 'Data Analysis & Visualization',
                'summary' => "Analyzing 1,000 students' academic performance across Math, Reading, and Writing using Tableau.",
                'description' => 'This project analyzes academic performance of 1,000 students across three subjects, Math, Reading, and Writing, using demographic and social background variables. Visualizations were created to understand trends in gender performance, ethnicity differences, parental education influence, and the impact of test preparation on student outcomes.',
                'tools' => ['Tableau'],
                'key_results' => [
                    'Female students consistently outperformed male students in Reading and Writing.',
                    'Students who completed the test preparation course scored significantly higher across all subjects.',
                    "Higher parental education correlated with higher average total scores, with Master's Degree families having the strongest outcomes.",
                ],
                'featured' => false,
                'order' => 7,
            ],
            [
                'title' => 'UMKMGo Web Interface Design',
                'category' => 'Interaction Design',
                'summary' => 'A complete web interface design for a platform supporting small and medium enterprises (UMKM).',
                'description' => 'This project focuses on designing a complete web interface for UMKMGo, a platform intended to support small and medium enterprises (UMKM) in promoting products, accessing training, and engaging in community discussions. The designs include multiple pages such as Homepage, Etalase, Pelatihan, Forum, Keranjang, Status Pesanan, Riwayat Transaksi, and Tentang UMKMGo. The goal is to apply interaction design principles, layout, visual hierarchy, usability, and navigation consistency using Figma as the main prototyping tool.',
                'tools' => ['Figma'],
                'key_results' => [
                    'Designed clear navigation menus and interactive elements across all pages for seamless user flow.',
                    'Developed responsive grid-based layouts for product listings, forums, and training content.',
                    'Implemented interactive prototypes simulating real user actions such as viewing items, navigating sections, and checking transaction status.',
                ],
                'featured' => false,
                'order' => 8,
            ],
        ];

        foreach ($projects as $project) {
            $project['slug'] = Str::slug($project['title']);
            Project::create($project);
        }
    }
}
