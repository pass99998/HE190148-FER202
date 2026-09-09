

/* =========================================================
 * 1. Class Person
 *    - Thuộc tính: name, age
 *    - Phương thức: introduce() hiển thị thông tin giới thiệu bản thân
 * ========================================================= */
export class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Xin chào, tôi tên là ${this.name}, năm nay ${this.age} tuổi.`;
  }
}

/* =========================================================
 * 2. Class Student kế thừa (extends) Person
 * ========================================================= */
export class Student extends Person {
  constructor(name, age, scores = []) {
    super(name, age); // gọi constructor của lớp cha Person
    this.scores = scores;
  }

  // Tính điểm trung bình dựa trên mảng scores
  getAverageScore() {
    if (this.scores.length === 0) return 0;
    const total = this.scores.reduce((sum, score) => sum + score, 0);
    return total / this.scores.length;
  }

  // Hiển thị đầy đủ thông tin sinh viên (kế thừa introduce() từ Person)
  displayInfo() {
    const avg = this.getAverageScore().toFixed(2);
    return `${this.introduce()} Danh sách điểm: [${this.scores.join(', ')}]. Điểm trung bình: ${avg}.`;
  }
}

/* =========================================================
 * 3. Sử dụng Rest Parameter
 * ========================================================= */
export function createScores(...scores) {
  return scores;
}

/* =========================================================
 * 4. Sử dụng Destructuring
 * ========================================================= */
export function getNameAndAge(student) {
  const { name, age } = student; // destructuring object
  return { name, age };
}

/* =========================================================
 * 5. Sử dụng Spread Operator
 * ========================================================= */
export function mergeScores(oldScores, newScores) {
  return [...oldScores, ...newScores]; // spread operator để gộp 2 mảng
}

/* =========================================================
 * 6. Sử dụng các Array Methods: filter, map, reduce
 * ========================================================= */


export function filterPassingScores(scores) {
  return scores.filter((score) => score >= 5);
}

/
export function formatScores(scores) {
  return scores.map((score) => `Điểm: ${score}`);
}

export function getTotalScore(scores) {
  return scores.reduce((total, score) => total + score, 0);
}


export function getAverageScoreFromArray(scores) {
  if (scores.length === 0) return 0;
  const total = getTotalScore(scores);
  return total / scores.length;
}

/* =========================================================
 * 7. Sử dụng Promise
 * ========================================================= */
export function evaluateStudent(student) {
  return new Promise((resolve, reject) => {
    // Giả lập độ trễ bất đồng bộ (ví dụ: gọi API, xử lý dữ liệu...)
    setTimeout(() => {
      try {
        const avg = student.getAverageScore();
        const result =
          avg >= 8 ? 'Excellent Student (Học sinh xuất sắc)' : 'Need Improvement (Cần cải thiện)';
        resolve({
          name: student.name,
          average: avg.toFixed(2),
          result,
        });
      } catch (error) {
        reject(error);
      }
    }, 1000); // giả lập độ trễ 1 giây
  });
}


function runDemo() {
  console.log('===== 1. Person Class =====');
  const person = new Person('Nguyễn Văn A', 20);
  console.log(person.introduce());

  console.log('\n===== 2. Student Class (extends Person) =====');
  const student1 = new Student('Trần Thị B', 19, [8, 9, 7, 10]);
  console.log(student1.displayInfo());

  console.log('\n===== 3. Rest Parameter: createScores(...scores) =====');
  const newScoresFromRest = createScores(8, 9, 10);
  console.log('Điểm tạo từ createScores(8, 9, 10):', newScoresFromRest);

  console.log('\n===== 4. Destructuring: name, age từ student object =====');
  const { name, age } = getNameAndAge(student1);
  console.log(`Tên: ${name}, Tuổi: ${age}`);

  console.log('\n===== 5. Spread Operator: gộp điểm mới vào điểm cũ =====');
  const mergedScores = mergeScores(student1.scores, newScoresFromRest);
  console.log('Danh sách điểm sau khi gộp:', mergedScores);
  student1.scores = mergedScores; // cập nhật lại điểm cho sinh viên

  console.log('\n===== 6. Array Methods: filter / map / reduce =====');
  const passingScores = filterPassingScores(student1.scores);
  console.log('Các điểm đạt (>= 5):', passingScores);

  const formattedScores = formatScores(student1.scores);
  console.log('Danh sách điểm đã định dạng:', formattedScores);

  const totalScore = getTotalScore(student1.scores);
  console.log('Tổng điểm:', totalScore);

  const averageScore = getAverageScoreFromArray(student1.scores);
  console.log('Điểm trung bình (tính bằng reduce):', averageScore.toFixed(2));

  console.log('\n===== 7. Promise: Đánh giá kết quả học tập bất đồng bộ =====');
  evaluateStudent(student1)
    .then((result) => {
      console.log('Kết quả đánh giá:', result);
    })
    .catch((error) => {
      console.error('Lỗi khi đánh giá:', error);
    });


  const student2 = new Student('Lê Văn C', 21, [5, 6, 4, 7]);
  evaluateStudent(student2).then((result) => {
    console.log('Kết quả đánh giá (sinh viên 2):', result);
  });
}

runDemo();
