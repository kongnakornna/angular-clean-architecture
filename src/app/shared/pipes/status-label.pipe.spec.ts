import { StatusLabelPipe } from './status-label.pipe';

describe('StatusLabelPipe', () => {
  let pipe: StatusLabelPipe;

  beforeEach(() => {
    pipe = new StatusLabelPipe();
  });

  it('should translate status codes to Thai', () => {
    expect(pipe.transform('pending')).toBe('รอดำเนินการ');
    expect(pipe.transform('in_progress')).toBe('กำลังดำเนินการ');
    expect(pipe.transform('completed')).toBe('เสร็จสิ้น');
    expect(pipe.transform('cancelled')).toBe('ยกเลิก');
    expect(pipe.transform('unknown')).toBe('unknown');
  });
});
